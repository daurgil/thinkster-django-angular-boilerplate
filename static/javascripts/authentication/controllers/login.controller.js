/**
* LoginController
* @namespace thinkster.authentication.controllers
*/
(function () {
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication'];

	/**
	* @namespace LoginController
	*/
	function LoginController($location, $scope, Authentication) {
		var vm = this;

		vm.login = login;

		activate();

		/**
		* @name activate
		* @desc Acciones a realizar cuando el controller se inicialice
		* @memberOf thinkster.authentication.controllers.Logincontroller
		*/
		function activate() {
			// Si el usuario ya ha accedido no debe estar aqui
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		/**
		* @name Login
		* @dec Log in del usuario
		* @memberOf thinkster.authentication.controllers.LoginController
		*/
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();