/* ==========================================================================
   js/app.js  -  SHARED HEADER, MENU, FOOTER, DEMO LOGIN STATE AND HELPERS
   --------------------------------------------------------------------------
   What this file does:
   1. Builds the same header (logo, menu, language buttons) and the same
      footer on every page, so you edit the menu in ONE place (see NAV below).
   2. Opens and closes the menu on phones.
   3. Holds the DEMO LOGIN STATE switch (visitor / verified member).
   4. Offers small helper tools that the other pages reuse.
   If anything fails here, a simple backup header is shown instead of a
   blank space.
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};

  /* ---------- Small helpers (used by every page) ---------- */

  /* Make an element:  IO.el('p', 'muted', 'Hello') */
  IO.el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  };

  /* Make an element whose text comes from the translation file and changes
     by itself when the language is switched. */
  IO.tEl = function (tag, className, key, fallback) {
    var node = IO.el(tag, className, IO.t(key, fallback));
    node.setAttribute('data-i18n', key);
    return node;
  };

  /* Remove everything inside an element. */
  IO.clear = function (node) {
    while (node && node.firstChild) { node.removeChild(node.firstChild); }
  };

  /* Read a value from the page address: gig.html?id=g3  ->  IO.param('id') = 'g3' */
  IO.param = function (name) {
    try {
      var value = new URLSearchParams(window.location.search).get(name);
      return value === null ? '' : value;
    } catch (err) {
      return '';
    }
  };

  /* A friendly "nothing here yet" box, with an optional button. */
  IO.emptyBox = function (icon, titleKey, textKey, linkHref, linkKey) {
    var box = IO.el('div', 'empty');
    box.appendChild(IO.el('div', 'empty-icon', icon));
    box.appendChild(IO.tEl('h3', '', titleKey));
    box.appendChild(IO.tEl('p', 'muted', textKey));
    if (linkHref && linkKey) {
      var link = IO.tEl('a', 'btn btn-primary', linkKey);
      link.setAttribute('href', linkHref);
      box.appendChild(link);
    }
    return box;
  };

  /* ======================================================================
     DEMO LOGIN STATE  (visitor / verified member)
     ----------------------------------------------------------------------
     !!! THIS ONLY HIDES THINGS VISUALLY. !!!
     Real protection must be added in Step 2 with Firebase security rules.
     Anyone can change this value in their own browser, so on its own it
     protects NOTHING. It exists only so you can test the views.
     ====================================================================== */
  var DEMO_KEY = 'inandout_demo_state';
  /* COMPANY STEP (later): a third state, "company" (verified company), will be added here. */
  var DEMO_STATES = ['visitor', 'verified'];
  var DEMO_LABELS = {
    visitor:  { key: 'demo.access.visitor',  fb: 'Visitor (not verified)' },
    verified: { key: 'demo.access.verified', fb: 'Verified member' }
  };
  var demoState = 'visitor';

  try {
    var savedState = window.localStorage.getItem(DEMO_KEY);
    if (DEMO_STATES.indexOf(savedState) !== -1) { demoState = savedState; }
  } catch (e0) { /* ignore: the default stays "visitor" */ }

  function refreshSwitch() {
    var buttons = document.querySelectorAll('[data-demo-state]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed',
        buttons[i].getAttribute('data-demo-state') === demoState ? 'true' : 'false');
    }
  }

  IO.demo = {
    states: DEMO_STATES,
    get: function () { return demoState; },
    set: function (state) {
      if (DEMO_STATES.indexOf(state) === -1 || state === demoState) { return; }
      demoState = state;
      try { window.localStorage.setItem(DEMO_KEY, state); } catch (e1) { /* ignore */ }
      refreshSwitch();
      try {
        document.dispatchEvent(new CustomEvent('inandout:statechange', { detail: { state: state } }));
      } catch (e2) { /* ignore */ }
    }
  };

  /* Any button with data-demo-state="..." changes the demo state. */
  document.addEventListener('click', function (event) {
    try {
      var el = event.target;
      var btn = (el && el.closest) ? el.closest('[data-demo-state]') : null;
      if (!btn) { return; }
      event.preventDefault();
      IO.demo.set(btn.getAttribute('data-demo-state'));
    } catch (err) {
      IO.reportError(err, 'error.generic');
    }
  });

  function buildDemoSwitch() {
    var box = IO.el('div', 'demo-state');
    box.setAttribute('role', 'group');
    box.appendChild(IO.tEl('span', 'demo-state-label', 'demo.access.label',
      'Demo login state (testing only):'));
    for (var i = 0; i < DEMO_STATES.length; i++) {
      var state = DEMO_STATES[i];
      var button = IO.tEl('button', '', DEMO_LABELS[state].key, DEMO_LABELS[state].fb);
      button.setAttribute('type', 'button');
      button.setAttribute('data-demo-state', state);
      button.setAttribute('aria-pressed', state === demoState ? 'true' : 'false');
      box.appendChild(button);
    }
    return box;
  }

  /* ---------- THE MENU: edit here to add or remove a menu item ---------- */
  /* href = the page file, key = the name in translations.js,
     fb = English backup text, pages = which pages highlight this item. */
  var NAV = [
    { href: 'index.html',        key: 'nav.home',    fb: 'Home',         pages: ['home'] },
    { href: 'browse.html',       key: 'nav.browse',  fb: 'Browse gigs',  pages: ['browse', 'gig', 'profile'] },
    { href: 'how-it-works.html', key: 'nav.how',     fb: 'How it works', pages: ['how'] },
    { href: 'post-gig.html',     key: 'nav.post',    fb: 'Post a gig',   pages: ['post'] },
    { href: 'safety.html',       key: 'nav.safety',  fb: 'Safety',       pages: ['safety'] },
    { href: 'faq.html',          key: 'nav.faq',     fb: 'FAQ',          pages: ['faq'] },
    { href: 'contact.html',      key: 'nav.contact', fb: 'Contact',      pages: ['contact'] }
  ];

  var FOOTER_LINKS = [
    { href: 'browse.html',       key: 'nav.browse',  fb: 'Browse gigs' },
    { href: 'how-it-works.html', key: 'nav.how',     fb: 'How it works' },
    { href: 'safety.html',       key: 'nav.safety',  fb: 'Safety' },
    { href: 'faq.html',          key: 'nav.faq',     fb: 'FAQ' },
    { href: 'contact.html',      key: 'nav.contact', fb: 'Contact' },
    { href: 'verification.html', key: 'nav.verify',  fb: 'Verification' },
    { href: 'login.html',        key: 'nav.login',   fb: 'Log in' },
    { href: 'signup.html',       key: 'nav.signup',  fb: 'Sign up' }
  ];

  var LANG_BUTTONS = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ru', label: 'RU', name: 'Русский' },
    { code: 'uz', label: 'UZ', name: 'O‘zbekcha' }
  ];

  /* Find the empty holder on the page, or create one if the page forgot it. */
  function getMount(id, atStart) {
    var node = document.getElementById(id);
    if (!node) {
      node = document.createElement('div');
      node.id = id;
      if (atStart && document.body.firstChild) {
        document.body.insertBefore(node, document.body.firstChild);
      } else {
        document.body.appendChild(node);
      }
    }
    return node;
  }

  function addSkipLink() {
    if (document.querySelector('.skip-link')) { return; }
    var skip = IO.tEl('a', 'skip-link', 'skip', 'Skip to main content');
    skip.setAttribute('href', '#main');
    document.body.insertBefore(skip, document.body.firstChild);
  }

  function navLink(item, current) {
    var link = IO.tEl('a', '', item.key, item.fb);
    link.setAttribute('href', item.href);
    if (item.pages.indexOf(current) !== -1) { link.setAttribute('aria-current', 'page'); }
    return link;
  }

  function buildHeader() {
    var current = document.body.getAttribute('data-page') || '';
    var mount = getMount('site-header', true);
    IO.clear(mount);

    /* Thin yellow strip: this is a demo, plus the demo login-state switch. */
    var bar = IO.el('div', 'demo-bar');
    bar.appendChild(IO.tEl('p', '', 'footer.demo', 'Demo website. All gigs and profiles are sample data.'));
    bar.appendChild(buildDemoSwitch());
    mount.appendChild(bar);

    var header = IO.el('header', 'site-header');
    var inner = IO.el('div', 'container header-inner');

    /* Logo */
    var brand = IO.el('a', 'brand');
    brand.setAttribute('href', 'index.html');
    brand.appendChild(document.createTextNode('In'));
    brand.appendChild(IO.el('span', '', '&'));
    brand.appendChild(document.createTextNode('Out'));
    inner.appendChild(brand);

    /* Right side: language buttons, account links (computer), Menu button (phone) */
    var actions = IO.el('div', 'header-actions');

    var langs = IO.el('div', 'lang-switch');
    langs.setAttribute('role', 'group');
    langs.setAttribute('aria-label', 'Language / Язык / Til');
    for (var i = 0; i < LANG_BUTTONS.length; i++) {
      var info = LANG_BUTTONS[i];
      var button = IO.el('button', '', info.label);
      button.setAttribute('type', 'button');
      button.setAttribute('data-lang', info.code);
      button.setAttribute('lang', info.code);
      button.setAttribute('aria-label', info.name);
      button.setAttribute('aria-pressed', info.code === IO.lang ? 'true' : 'false');
      langs.appendChild(button);
    }
    actions.appendChild(langs);

    var account = IO.el('div', 'header-account');
    var login = IO.tEl('a', 'account-link', 'nav.login', 'Log in');
    login.setAttribute('href', 'login.html');
    var signup = IO.tEl('a', 'btn btn-primary btn-small', 'nav.signup', 'Sign up');
    signup.setAttribute('href', 'signup.html');
    account.appendChild(login);
    account.appendChild(signup);
    actions.appendChild(account);

    var toggle = IO.tEl('button', 'nav-toggle', 'nav.menu', 'Menu');
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'site-nav');
    actions.appendChild(toggle);
    inner.appendChild(actions);

    /* The menu list */
    var nav = IO.el('nav', 'site-nav');
    nav.id = 'site-nav';
    nav.setAttribute('aria-label', 'Main');
    for (var n = 0; n < NAV.length; n++) { nav.appendChild(navLink(NAV[n], current)); }

    var loginMobile = IO.tEl('a', 'nav-account-mobile', 'nav.login', 'Log in');
    loginMobile.setAttribute('href', 'login.html');
    var signupMobile = IO.tEl('a', 'btn btn-primary nav-account-mobile', 'nav.signup', 'Sign up');
    signupMobile.setAttribute('href', 'signup.html');
    nav.appendChild(loginMobile);
    nav.appendChild(signupMobile);
    inner.appendChild(nav);

    header.appendChild(inner);
    mount.appendChild(header);

    /* Open and close the menu on phones. */
    function setOpen(open) {
      if (open) { nav.classList.add('open'); } else { nav.classList.remove('open'); }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', IO.safe(function () {
      setOpen(!nav.classList.contains('open'));
    }));
    document.addEventListener('keydown', function (event) {
      if (event && event.key === 'Escape') { setOpen(false); }
    });
  }

  function buildFooter() {
    var mount = getMount('site-footer', false);
    IO.clear(mount);

    var footer = IO.el('footer', 'site-footer');
    var box = IO.el('div', 'container');

    box.appendChild(IO.el('p', 'footer-brand', 'In&Out'));
    box.appendChild(IO.tEl('p', '', 'footer.tagline', 'Find help. Find work. Get it done.'));

    var links = IO.el('div', 'footer-links');
    for (var i = 0; i < FOOTER_LINKS.length; i++) {
      var link = IO.tEl('a', '', FOOTER_LINKS[i].key, FOOTER_LINKS[i].fb);
      link.setAttribute('href', FOOTER_LINKS[i].href);
      links.appendChild(link);
    }
    box.appendChild(links);

    box.appendChild(IO.tEl('p', '', 'footer.demo', 'Demo website. All gigs and profiles are sample data.'));
    box.appendChild(IO.tEl('p', 'footer-legal', 'footer.legal',
      'Privacy and terms texts are not written yet. DRAFT: needs lawyer review.'));

    footer.appendChild(box);
    mount.appendChild(footer);
  }

  /* Backup header, used only if the real one could not be built. */
  function fallbackHeader() {
    try {
      var mount = getMount('site-header', true);
      IO.clear(mount);
      var box = IO.el('div', 'container btn-row');
      box.style.padding = '12px 16px';
      var home = IO.el('a', 'btn btn-outline btn-small', 'In&Out');
      home.setAttribute('href', 'index.html');
      var browse = IO.el('a', 'btn btn-outline btn-small', 'Browse gigs');
      browse.setAttribute('href', 'browse.html');
      box.appendChild(home);
      box.appendChild(browse);
      mount.appendChild(box);
    } catch (err) { /* nothing more we can do */ }
  }

  function init() {
    try {
      addSkipLink();
      buildHeader();
    } catch (err) {
      fallbackHeader();
      IO.reportError(err, 'error.load');
    }
    try {
      buildFooter();
    } catch (err2) {
      IO.reportError(err2, 'error.load');
    }
    try {
      if (IO.applyTranslations) { IO.applyTranslations(); }
    } catch (err3) { /* ignore */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();