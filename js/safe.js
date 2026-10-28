/* ==========================================================================
   js/safe.js  -  CRASH PROTECTION AND "COMING SOON" ENGINE
   --------------------------------------------------------------------------
   What this file does:
   1. Shows friendly pop-up messages (called "toasts") instead of crashes.
   2. Handles every button that has data-feature="something".
        - If that feature's switch is OFF  -> shows "Coming soon".
        - If it is ON -> runs that feature's own file, protected so that
          any failure only shows a friendly message.
   3. Catches any unexpected error anywhere on the page and shows a calm
      message instead of leaving the visitor with a broken page.
   You normally never need to edit this file.
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};
  IO.featureModules = IO.featureModules || {};

  /* English names of each feature (used if translations are not loaded). */
  var LABELS = {
    payments: 'Online payments',
    escrow: 'Payment holding',
    idCheck: 'Automatic ID check',
    audioCalls: 'Audio calls',
    smsVerification: 'SMS verification',
    emailNotifications: 'Email notifications'
  };

  /* Translation helper. Later, translations.js will replace this with the
     real one. Until then it simply returns the English fallback text. */
  IO.t = IO.t || function (key, fallback) {
    return fallback !== undefined ? fallback : key;
  };

  /* ----- Friendly pop-up message ----- */
  function ensureStyle() {
    if (document.getElementById('io-toast-style')) { return; }
    var s = document.createElement('style');
    s.id = 'io-toast-style';
    s.textContent =
      '.io-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);' +
      'max-width:92%;width:420px;box-sizing:border-box;padding:16px 20px;' +
      'border-radius:12px;font:18px/1.4 system-ui,Arial,sans-serif;color:#fff;' +
      'background:#14365d;box-shadow:0 6px 24px rgba(0,0,0,.3);z-index:99999;' +
      'text-align:center}' +
      '.io-toast-error{background:#9b1c1c}';
    document.head.appendChild(s);
  }

  IO.showMessage = function (text, kind) {
    try {
      ensureStyle();
      var old = document.getElementById('io-toast');
      if (old && old.parentNode) { old.parentNode.removeChild(old); }
      var box = document.createElement('div');
      box.id = 'io-toast';
      box.className = 'io-toast io-toast-' + (kind || 'info');
      box.setAttribute('role', 'status');
      box.setAttribute('aria-live', 'polite');
      box.textContent = text;
      document.body.appendChild(box);
      setTimeout(function () {
        if (box.parentNode) { box.parentNode.removeChild(box); }
      }, 5000);
    } catch (e) {
      try { alert(text); } catch (e2) { /* nothing more we can do */ }
    }
  };

  /* ----- Error reporting (friendly for visitors, technical in console) ----- */
  var lastErrorTime = 0;

  IO.reportError = function (err, key, fallback) {
    try {
      if (window.console && console.warn) {
        console.warn('In&Out caught a problem (visitor saw a friendly message):', err);
      }
      var now = new Date().getTime();
      if (now - lastErrorTime < 3000) { return; } /* do not spam messages */
      lastErrorTime = now;
      IO.showMessage(
        IO.t(key || 'error.generic',
          fallback || 'Sorry, something went wrong. Nothing was lost. Please try again.'),
        'error'
      );
    } catch (e) { /* never crash while reporting a crash */ }
  };

  /* ----- Wrap any function so it can never crash the page ----- */
  IO.safe = function (fn, errorKey, errorFallback) {
    return function () {
      try {
        var result = fn.apply(this, arguments);
        if (result && typeof result.catch === 'function') {
          result.catch(function (err) { IO.reportError(err, errorKey, errorFallback); });
        }
        return result;
      } catch (err) {
        IO.reportError(err, errorKey, errorFallback);
      }
    };
  };

  /* ----- Safety net for anything unexpected ----- */
  window.addEventListener('error', function (event) {
    IO.reportError(event && event.error, 'error.generic');
  });
  window.addEventListener('unhandledrejection', function (event) {
    IO.reportError(event && event.reason, 'error.generic');
  });

  /* ----- Feature switch helpers ----- */
  IO.isOn = function (name) {
    var flags = window.INANDOUT_FEATURES;
    return !!(flags && flags[name] === true);
  };

  IO.registerFeature = function (name, moduleObject) {
    IO.featureModules[name] = moduleObject;
  };

  IO.useFeature = function (name, context) {
    try {
      var mod = IO.featureModules[name];
      var label = IO.t('feature.name.' + name, LABELS[name] || name);

      if (!IO.isOn(name)) {
        IO.showMessage(
          label + ': ' + IO.t('feature.comingSoon',
            'Coming soon! We are still preparing this feature.'),
          'info'
        );
        return;
      }

      if (!mod || typeof mod.run !== 'function') {
        IO.showMessage(
          label + ': ' + IO.t('feature.notReady',
            'This feature is not available right now. Please try again later.'),
          'info'
        );
        return;
      }

      var result = mod.run(context || {});
      if (result && typeof result.catch === 'function') {
        result.catch(function (err) {
          IO.reportError(err, 'feature.failed',
            'This feature ran into a problem. Nothing was lost. Please try again later.');
        });
      }
    } catch (err) {
      IO.reportError(err, 'feature.failed',
        'This feature ran into a problem. Nothing was lost. Please try again later.');
    }
  };

  /* ----- One listener handles EVERY button marked data-feature="..." ----- */
  document.addEventListener('click', function (event) {
    try {
      var el = event.target;
      var button = (el && el.closest) ? el.closest('[data-feature]') : null;
      if (!button) { return; }
      event.preventDefault();
      IO.useFeature(button.getAttribute('data-feature'), { element: button });
    } catch (err) {
      IO.reportError(err, 'error.generic');
    }
  });
})();