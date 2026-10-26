/* ==========================================================================
   js/features/idcheck.js  -  AUTOMATIC ID / FACE CHECK (own separate file)
   Switch name in features.js:  idCheck
   The real ID-check code will be placed inside run() in a later step.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('idCheck', {
    run: function (context) {
      /* REAL ID CHECK CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();