(function() {
  'use strict';

  angular
    .module('angularLocationservice')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
