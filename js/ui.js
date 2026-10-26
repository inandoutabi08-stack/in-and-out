/* ==========================================================================
   js/ui.js  -  SHARED PIECES OF THE SCREEN (drawn the same way on every page)
   --------------------------------------------------------------------------
   Right now it draws the gig card. Later batches add more pieces here.
   Needs app.js (helpers) and data.js (sample data) to be loaded.
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};
  var ui = IO.ui = {};

  /* The yellow "Sample data" label. */
  ui.sampleBadge = function () {
    return IO.tEl('span', 'badge badge-sample', 'common.sample', 'Sample data');
  };

  /* A verification status chip. status = none, pending, verified or rejected.
     "verified" exists ONLY for sample workers, and a "Sample data" badge
     must always be shown next to it. */
  ui.statusChip = function (status) {
    var known = { none: 1, pending: 1, verified: 1, rejected: 1 };
    var s = known[status] ? status : 'none';
    return IO.tEl('span', 'status status-' + s, 'status.' + s, 'Not verified');
  };

  /* "150 000 UZS" or "80 000 UZS per hour" */
  ui.priceText = function (gig) {
    var text = IO.formatPrice(gig.price);
    if (gig.unit === 'hour') { text += ' ' + IO.t('common.perHour', 'per hour'); }
    return text;
  };

  /* One gig card.
     SAFETY STEP (later): the rules for visitors (teaser or hidden) will be
     applied here, so every page gets them automatically. */
  ui.gigCard = function (gig) {
    var worker = IO.data.getWorker(gig.workerId);
    var card = IO.el('article', 'card gig-card');

    var meta = IO.el('div', 'gig-meta');
    meta.appendChild(IO.tEl('span',
      'badge ' + (gig.mode === 'online' ? 'badge-online' : 'badge-inperson'),
      gig.mode === 'online' ? 'common.online' : 'common.inPerson'));
    meta.appendChild(IO.tEl('span', 'badge', 'cat.' + gig.category));
    if (gig.city && gig.city !== 'any') {
      meta.appendChild(IO.tEl('span', 'badge', 'city.' + gig.city));
    }
    meta.appendChild(ui.sampleBadge());
    card.appendChild(meta);

    var title = IO.el('h3', 'gig-title');
    var titleLink = IO.el('a', '', IO.pick(gig.title));
    titleLink.setAttribute('href', 'gig.html?id=' + encodeURIComponent(gig.id));
    title.appendChild(titleLink);
    card.appendChild(title);

    card.appendChild(IO.el('p', 'muted', IO.pick(gig.desc)));

    var by = IO.el('p', 'muted');
    by.appendChild(IO.tEl('span', '', 'gig.offeredBy', 'Offered by'));
    by.appendChild(document.createTextNode(': '));
    if (worker) {
      var workerLink = IO.el('a', '', worker.name);
      workerLink.setAttribute('href', 'profile.html?id=' + encodeURIComponent(worker.id));
      by.appendChild(workerLink);
    } else {
      by.appendChild(document.createTextNode('-'));
    }
    card.appendChild(by);

    card.appendChild(IO.el('p', 'muted',
      IO.t('common.upToDays', 'Up to {n} days', { n: gig.days })));

    card.appendChild(IO.el('div', 'gig-price', ui.priceText(gig)));

    var button = IO.tEl('a', 'btn btn-secondary btn-block', 'common.viewGig', 'View gig');
    button.setAttribute('href', 'gig.html?id=' + encodeURIComponent(gig.id));
    card.appendChild(button);

    return card;
  };
})();