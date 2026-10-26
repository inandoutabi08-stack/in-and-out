/* ==========================================================================
   js/features/payments.js  -  REAL PAYMENTS (own separate file)
   Switch name in features.js:  payments
   This file only runs when that switch is true. The real payment code
   will be placed inside run() in a later step.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('payments', {
    run: function (context) {
      /* REAL PAYMENT CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();