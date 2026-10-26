/* ==========================================================================
   js/features/email.js  -  EMAIL NOTIFICATIONS (own separate file)
   Switch name in features.js:  emailNotifications
   The real email code will be placed inside run() in a later step.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('emailNotifications', {
    run: function (context) {
      /* REAL EMAIL CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();