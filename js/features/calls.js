/* ==========================================================================
   js/features/calls.js  -  AUDIO CALLS (own separate file)
   Switch name in features.js:  audioCalls
   The real audio-call code will be placed inside run() in a later step.
   ========================================================================== */
(function () {
  'use strict';
  var IO = window.InAndOut = window.InAndOut || {};

  IO.registerFeature('audioCalls', {
    run: function (context) {
      /* REAL AUDIO CALL CODE WILL GO HERE (later step). */
      IO.showMessage(
        IO.t('feature.switchedOnNotBuilt',
          'This feature is switched on, but its real connection has not been built yet.'),
        'info'
      );
    }
  });
})();