/* ==========================================================================
   js/forms.js  -  SHARED TOOLS FOR CHECKING FORMS
   --------------------------------------------------------------------------
   Used by the sign-up, login and contact pages.
   Rules of the game: a field with id "f-name" has its red message in an
   element with id "err-name".
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};
  var forms = IO.forms = {};

  /* Show (key given) or clear (key empty) the red message under a field. */
  forms.setError = function (id, key) {
    var message = document.getElementById('err-' + id);
    var field = document.getElementById('f-' + id);
    if (!message || !field) { return; }
    if (key) {
      message.setAttribute('data-i18n', key);
      message.textContent = IO.t(key);
      message.classList.remove('hidden');
      field.setAttribute('aria-invalid', 'true');
      field.style.borderColor = '#9b1c1c';
    } else {
      message.removeAttribute('data-i18n');
      message.textContent = '';
      message.classList.add('hidden');
      field.removeAttribute('aria-invalid');
      field.style.borderColor = '';
    }
  };

  /* Make a checker: call check(id, ok, key) for each field, then ask firstBad(). */
  forms.checker = function () {
    var firstBad = '';
    return {
      check: function (id, ok, key) {
        if (ok) {
          forms.setError(id, '');
        } else {
          forms.setError(id, key);
          if (!firstBad) { firstBad = id; }
        }
      },
      firstBad: function () { return firstBad; }
    };
  };

  /* Show or hide any element by its id. */
  forms.toggle = function (id, visible) {
    var node = document.getElementById(id);
    if (!node) { return; }
    if (visible) { node.classList.remove('hidden'); } else { node.classList.add('hidden'); }
  };

  forms.focusField = function (id) {
    try { document.getElementById('f-' + id).focus(); } catch (e) { /* ignore */ }
  };

  /* A simple, forgiving check: something@something.something */
  forms.isEmail = function (text) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(text || '').trim());
  };

  /* A simple check: between 9 and 15 digits (spaces, + and dashes are allowed). */
  forms.isPhone = function (text) {
    var digits = String(text || '').replace(/\D/g, '');
    return digits.length >= 9 && digits.length <= 15;
  };
})();