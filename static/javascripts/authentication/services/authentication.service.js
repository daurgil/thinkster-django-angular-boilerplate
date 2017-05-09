/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc {Factory}
    */
    var Authentication = {
      register: register,
      login: login,
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate,
      logout: logout,
    };

    return Authentication;

    /**
     * @name getAuthenticatedAccount
     * @desc Devuelve la cuenta del ususario autenticada
     * @returns {object|undefined} Lcuenta si esta autenticada, si no `undefined`.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }

      return JSON.parse($cookies.authenticatedAccount);
    }

    /**
     * @name isAuthenticated
     * @desc Devuelve si el ususario actual esta autenticado
     * @returns {boolean} True si el usuario esta autenticado, si no false.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Hace Stringify de la cuenta y la guarda en una cookie.
     * @param {Object} account Objecto account a guardar.
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    /**
     * @name unauthenticate
     * @desc Borra la cookie donde se guarda el usuario.
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }
    ////////////////////

    /**
    * @name register
    * @desc Prueba para registrar usuario.
    * @param {string} username El username escrito por el usuario.
    * @param {string} password El password escrito por el usuario.
    * @param {string} email El email escrito por el usuario.
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      });.then(registerSuccessFn, registerErrorFn);*/


      /**
      * @name registerSuccessFn
      * @desc Hace login del nuevoo usuari
      */
      function registerSuccessFn(data, status, headers, config){
        Authentication.login(email, password);
      }


      /**
      * @name registerErrorFn
      * @desc Escribe un log "Error epic!" en la consola
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }

    }

    /**
     * @name login
     * @desc Intenta hacer log in con email `email` y password `password`
     * @param {string} email El email escrito por el usuario.
     * @param {string} password El password escrito por el usuario.
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function login(email, password) {

      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      });.then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Guarda la cuenta y redirecciona al index
       */
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Escribe un log "Error epic!" en la consola
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }
    }

    /**
    * @name logout
    * @desc Intenta hacer un logout del usuario
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unautentica y redirecciona al index con un reload
       */
      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/';
      }

      /**
       * @name logoutErrorFn
       * @desc Escribe un log "Error epic!" en la consola
       */
      function logoutErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }
    }
  }
})();