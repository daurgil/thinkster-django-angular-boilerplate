(function () {
  'use strict';

  angular
    .module('thinkster', [
      'thinkster.routes',
      'thinkster.authentication',
      'thinkster.config',
      'thinkster.layout'
    ]);

  angular
    .module('thinkster.config', []);

  angular
    .module('thinkster.routes', ['ngRoute']);


  /*Soporte CSRF token de django*/
  angular
  .module('thinkster')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http encabezados para alinearse con los valores predeterminados de Django
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }

})();