/* ==========================================================================
   js/access.js  -  WHO MAY SEE WHAT  (verified members only)
   --------------------------------------------------------------------------
   !!! THIS ONLY HIDES THINGS VISUALLY. !!!
   Real protection must be added in Step 2 with Firebase security rules.
   Everything in this demo (including the sample data) can be read by anyone
   who opens the website's files, so nothing here protects anything.

   The rules in plain words:
   - A VISITOR (not verified) sees only: home page, how it works, safety,
     FAQ, contact, sign-up, login and the verification form.
   - A VERIFIED MEMBER sees everything, unless the account is SUSPENDED.
   - A SUSPENDED member loses all member access at once and sees a friendly
     "account suspended" screen.

   How a page uses this file:
     IO.access.gate(box, function (box) { ...build the real page into box... });
   Needs app.js (helpers and demo state) to be loaded first.
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};
  var A = IO.access = {};

  var SUSPEND_KEY = 'inandout_demo_suspended';
  var suspended = false;

  try {
    suspended = window.localStorage.getItem(SUSPEND_KEY) === '1';
  } catch (e0) { /* ignore: stays not suspended */ }

  A.isSuspended = function () { return suspended; };

  /* The admin page design uses this to show the suspended screen. */
  A.setSuspended = function (value) {
    var next = !!value;
    if (next === suspended) { return; }
    suspended = next;
    try {
      if (next) { window.localStorage.setItem(SUSPEND_KEY, '1'); }
      else { window.localStorage.removeItem(SUSPEND_KEY); }
    } catch (e1) { /* ignore */ }
    try {
      document.dispatchEvent(new CustomEvent('inandout:statechange', { detail: { suspended: next } }));
    } catch (e2) { /* ignore */ }
  };

  /* Returns 'visitor', 'suspended' or 'member'. If anything is missing, the safer answer is 'visitor'. */
  A.level = function () {
    var state = (IO.demo && IO.demo.get) ? IO.demo.get() : 'visitor';
    /* COMPANY STEP (later): the state "company" (verified company) will count as a member here. */
    if (state !== 'verified') { return 'visitor'; }
    return suspended ? 'suspended' : 'member';
  };

  A.isMember = function () { return A.level() === 'member'; };

  /* The friendly "members only" screen. */
  A.lockedBox = function () {
    var box = IO.emptyBox('🔒', 'access.locked.title', 'access.locked.text');

    var row = IO.el('div', 'btn-row');
    row.style.justifyContent = 'center';
    row.style.marginTop = '14px';

    var signup = IO.tEl('a', 'btn btn-primary', 'nav.signup', 'Sign up');
    signup.setAttribute('href', 'signup.html');
    var login = IO.tEl('a', 'btn btn-outline', 'nav.login', 'Log in');
    login.setAttribute('href', 'login.html');
    var verify = IO.tEl('a', 'btn btn-outline', 'access.locked.verify', 'Start verification');
    verify.setAttribute('href', 'verification.html');
    row.appendChild(signup);
    row.appendChild(login);
    row.appendChild(verify);
    box.appendChild(row);

    var hint = IO.tEl('p', 'muted', 'access.locked.demo',
      'Demo tip: use the yellow strip at the top to switch to “Verified member”.');
    hint.style.marginTop = '16px';
    hint.style.fontSize = '0.95rem';
    box.appendChild(hint);
    return box;
  };

  /* The friendly "account suspended" screen. */
  A.suspendedBox = function () {
    var box = IO.emptyBox('⏸️', 'access.suspended.title', 'access.suspended.text');

    var row = IO.el('div', 'btn-row');
    row.style.justifyContent = 'center';
    row.style.marginTop = '14px';
    var contact = IO.tEl('a', 'btn btn-primary', 'nav.contact', 'Contact');
    contact.setAttribute('href', 'contact.html');
    var home = IO.tEl('a', 'btn btn-outline', 'common.backHome', 'Back to home');
    home.setAttribute('href', 'index.html');
    row.appendChild(contact);
    row.appendChild(home);
    box.appendChild(row);

    var draft = IO.tEl('span', 'badge badge-sample', 'draft.tag', 'DRAFT: needs review');
    draft.style.marginTop = '16px';
    box.appendChild(draft);
    return box;
  };

  /* Fill `box` with the real page (members) or with a friendly locked or suspended screen.
     `build` is only called for members. Returns true when the real page was shown. */
  A.gate = function (box, build) {
    var level = A.level();
    IO.clear(box);
    if (level === 'member') {
      build(box);
      return true;
    }
    box.appendChild(level === 'suspended' ? A.suspendedBox() : A.lockedBox());
    return false;
  };

  /* The ONLY badge a member gets: "Identity checked" (always with "Sample data" in this demo). */
  A.identityBadges = function () {
    var wrap = IO.el('span', 'member-badges');
    wrap.appendChild(IO.tEl('span', 'badge badge-identity', 'badge.identity', 'Identity checked'));
    wrap.appendChild(document.createTextNode(' '));
    wrap.appendChild(IO.tEl('span', 'badge badge-sample', 'common.sample', 'Sample data'));
    return wrap;
  };
})();