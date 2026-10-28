/* ==========================================================================
   js/features/escrow.js  -  ESCROW / SAFE MONEY HOLDING (own separate file)
   Switch name in features.js:  escrow
   Escrow needs "payments" to be ON first. If it is not, we show a polite
   message instead of failing.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('escrow', {
    run: function (context) {
      if (!IO.isOn('payments')) {
        IO.showMessage(
          IO.t('feature.needsPayments',
            'Payment holding needs online payments to be switched on first.'),
          'info'
        );
        return;
      }
      /* REAL ESCROW CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();