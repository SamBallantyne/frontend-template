/**
 * Created by SamBallantyne on 12/12/16.
 */
"use strict";

angular
	.module('myApp.apiservice', [])
	.factory('ApiService', ['$http', function ($http) {

		const _SESSION_STORAGE_AUTH_TOKEN_KEY = "__a__t";
		const _AUTHENTICATION_URL = "";

		var _service = {};
		var _authToken = window.sessionStorage[_SESSION_STORAGE_AUTH_TOKEN_KEY] || "";

		_service.needsLogin = function () {
			return !_authToken
		};

		_service.login = function (email, password) {
			return new Promise(function (resolve, reject) {
				$http.post(_AUTHENTICATION_URL, JSON.stringify({email:email, password:password}))
					.then(
						function success (data, status) {
							if (status == 200)
								resolve(data);
							else
								reject(data);
						},
						function fail (data, status) {
							reject(data);
						});
			});
		};

		_service.logout = function () {
			_authToken = null;
			window.sessionStorage[_SESSION_STORAGE_AUTH_TOKEN_KEY] = null;
		};

		return _service;
	}]);