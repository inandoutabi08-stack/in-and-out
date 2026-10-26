/* ==========================================================================
   js/features/sms.js  -  SMS VERIFICATION (own separate file)
   Switch name in features.js:  smsVerification
   The real SMS code will be placed inside run() in a later step.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('smsVerification', {
    run: function (context) {
      /* REAL SMS CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();