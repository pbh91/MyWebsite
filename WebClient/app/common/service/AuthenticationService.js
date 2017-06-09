'use strict';

var serviceId = 'AuthenticationService';

angular.module('wapClient').service('AuthenticationService', ['$window', '$location', '$rootScope','$cookies', function ($window, $location, $rootScope,$cookies) {

    this.isLoggedIn = function () {
        if (typeof $cookies.get('token') === 'undefined') {
            return false;
        } else {
            return true;
        }
    };

    this.login = function (data) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.put('token',data, {'expires': expireDate});

    };

    this.logout = function () {
        $cookies.remove('token'); //doesn't work if the token was set by the back end
        document.cookie = "token=;path=/;expires=Mon, 01 Jan 1970 01:01:01 GMT;domain=." + document.domain; //so nuke it from orbit
        $cookies.remove('userRole');
        $cookies.remove('agencyId');
        $cookies.remove('agencyName');
        $location.path('/login');
    };

    $rootScope.$on('logout', this.logout);

}])


    .factory('authInterceptor', ['$window', '$rootScope','$cookies', '$injector', 'toaster', '$timeout', function ($window, $rootScope,$cookies, $injector, toaster, $timeout) {

        return {
        request: function (config) {

            var indexRoles = -1;
            var Roles = ["CSR", "AGENT", "UNDERWRITER", "ADMIN"];
            if($cookies.get('userRole') != undefined){

                var actual = decodeURI($cookies.get('userRole'));
                var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
                if (base64Matcher.test(actual)) {
                    var userRole = window.atob(actual);
                }
              if(userRole!== undefined){
                  userRole = userRole.toUpperCase();
                  indexRoles = Roles.indexOf(userRole);

              }
            }

                if ($cookies.get('token') !== undefined && indexRoles!= -1) {
                    config.headers.Authorization = "Bearer "+$cookies.get('token');
                }else{
                    var state = $injector.get('$state');
                    if ('login' != state.current.name && '' != state.current.name) {
                        if (true != $rootScope.forceLoggingOut) {
                            toaster.pop('error', "Error! ", 'You have been logged out of Breeze.');
                        }
                        $rootScope.forceLoggingOut = true;
                        $rootScope.$broadcast('logout');
                    }

                }
                return config;
            },
            response: function (response) {
               /* if (response.status === 401  || $cookies.get('token') === undefined) {
                    var state = $injector.get('$state');
                    if (state.current.name!= '' && 'login' != state.current.name) {
                        if (true != $rootScope.forceLoggingOut) {
                            toaster.pop('error', "Error! ", 'You have been logged out of Weston.');
                        }
                        $rootScope.forceLoggingOut = true;
                        $rootScope.$broadcast('logout');
                    }
                }*/
                return response;
            },
            responseError: function (response) {

                if (response.status === 401 || $cookies.get('token') === undefined) {
                    var state = $injector.get('$state');

                    if ('login' != state.current.name) {
                        if (true != $rootScope.forceLoggingOut) {
                            toaster.pop('error', "Error! ", 'You have been logged out of Breeze.');
                        }
                        $rootScope.forceLoggingOut = true;
                        $rootScope.$broadcast('logout');
                    }
                } else {
                   // toaster.pop('error', "Error! ", 'Something went wrong. Please try again.');
                }
                return response;
            }
        };
    }])
    /*this will be called once the service falied and show retry*/
    .factory('RetryInterceptor', function($injector, $timeout, $q, $rootScope, $cookies) {

        return {
            'responseError': function(rejection) {
                if($cookies.get('token') !== undefined) {
                    // Avoid circular dependency issues
                    var Retry = $injector.get('Retry');
                    var $http = $injector.get('$http');
                    // Timeout is just to keep UI from changing too quickly
                    return $timeout(angular.noop, 1000).then(function () {
                        return Retry.show(rejection);
                    }).then(function () {
                        return $http(rejection.config);
                    }, function () {
                        return $q.reject(rejection);
                    });
                }else{

                var state = $injector.get('$state');

                    if ('login' != state.current.name) {
                        if (true != $rootScope.forceLoggingOut) {
                            toaster.pop('error', "Error! ", 'You have been logged out of Breeze.');
                        }
                        $rootScope.forceLoggingOut = true;
                        $rootScope.$broadcast('logout');
                    }
                }
            }
        }
    })
    .service('Retry', function Retry($window, $modal) {
       this.show  = function() {
            return $modal.open({
                templateUrl: 'common/retry-dialog.html',
                controller: 'RetryController',
                backdrop :'static',
                keyboard : false
            }).result;
        }
    })

    .controller('RetryController', function($scope, $modalInstance) {
        $scope.retry = function() {
            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss();
            window.location.reload();
        };
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        $httpProvider.interceptors.push('RetryInterceptor');
      }]);


