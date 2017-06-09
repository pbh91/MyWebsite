(function () {
    'use strict';


    angular.module('login').controller('errorMessagesCtrl', ['$scope', '$modalInstance', 'message', errorMessagesCtrl])
    errorMessagesCtrl.$inject = ['$scope', '$modalInstance', 'message'];
    function errorMessagesCtrl($scope, $modalInstance, message) {
        $scope.message = message;
        $scope.ok = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    angular.module('login').controller('passwordExpireNoticeCtrl', ['$scope', '$rootScope', '$modalInstance', 'data', passwordExpireNoticeCtrl])
    passwordExpireNoticeCtrl.$inject = ['$scope', '$rootScope', '$modalInstance', 'data'];
    function passwordExpireNoticeCtrl($scope, $rootScope, $modalInstance, data) {
        $scope.daysRemaining = data.daysRemaining;
        $scope.ok = function () {
            $modalInstance.close();
        };

        var theForm = document.forms['frmLogin'];
        if (!theForm) {
            theForm = document.frmLogin;
        }
        function __doPostBack(eventTarget, eventArgument) {
            if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
                theForm.__EVENTTARGET.value = eventTarget;
                theForm.__EVENTARGUMENT.value = eventArgument;
                theForm.submit();
            }
        }

        $scope.changePassword = function () {
            $modalInstance.dismiss('cancel');
            angular.element('#frmLogin').attr('action', $rootScope.agencyLinkUrl);
            __doPostBack('ChangePasswordButton', '');
        };
    }

    angular.module('login').controller('passwordExpiredCtrl', ['$scope', '$rootScope', '$modalInstance', passwordExpiredCtrl])
    passwordExpiredCtrl.$inject = ['$scope', '$rootScope', '$modalInstance'];
    function passwordExpiredCtrl($scope, $rootScope, $modalInstance) {
        var theForm = document.forms['frmLogin'];
        if (!theForm) {
            theForm = document.frmLogin;
        }
        function __doPostBack(eventTarget, eventArgument) {
            if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
                theForm.__EVENTTARGET.value = eventTarget;
                theForm.__EVENTARGUMENT.value = eventArgument;
                theForm.submit();
            }
        }

        $scope.changePassword = function () {
            $modalInstance.dismiss('cancel');
            angular.element('#frmLogin').attr('action', $rootScope.agencyLinkUrl);
            __doPostBack('ChangePasswordButton', '');


        };
    }

    angular.module('login')
        .controller('loginCtrl', ['wapService', '$scope', '$http', '$stateParams', '$state', '$cookies', '$location', '$modal', '$rootScope', '$sce', loginCtrl]);
    loginCtrl.$inject = ['wapService', '$scope', '$http', '$stateParams', '$state', '$cookies', '$location', '$modal', '$rootScope', '$sce'];
    function loginCtrl(wapService, $scope, $http, $stateParams, $state, $cookies, $location, $modal, $rootScope, $sce) {
        var vm = this;
        vm.ctrlName = 'loginCtrl';
        vm.user = {};
        vm.errorMessage = '';
        vm.user.systemType = 'breeze';
        vm.loginButton = loginButton;
        vm.postLogin = postLogin;
        $scope.currentPath = $location.path();
        vm.user.username = '';
        vm.user.password = '';
        vm.user.changePassword = 0;
        $rootScope.isAdminAgent = false;
        if ($cookies.get('userName') != undefined && $cookies.get('agencyId') != undefined) {
            if (!isNaN(parseInt(window.atob(decodeURI($cookies.get('userName'))))) && (parseInt(window.atob(decodeURI($cookies.get('userName')))) === parseInt($cookies.get('agencyId')))) {
                $rootScope.isAdminAgent = true;
            }
        }

        var theForm = document.forms['frmLogin'];
        if (!theForm) {
            theForm = document.frmLogin;
        }

        function __doPostBack(eventTarget, eventArgument) {
            if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
                theForm.__EVENTTARGET.value = eventTarget;
                theForm.__EVENTARGUMENT.value = eventArgument;
                theForm.submit();
            }
        }
        function loginButton(status) {
            if (status === 'load') {
                angular.element('.login-button').html('<div class="loader">Loading...</div>').removeClass('btn-danger').addClass('btn-success');

            } else if (status === 'success') {
                angular.element('.login-button').html('Success!').removeClass('btn-danger').addClass('btn-success');
                angular.element('.login-form .username, .login-form .grant_type').addClass('ng-pristine').removeClass('ng-invalid');

            } else if (status === 'failure') {
                angular.element('.login-button').html('<span class="login-span"><i class="fa fa-exclamation-triangle"></i> Incorrect email or password</span>').removeClass('btn-success').addClass('btn-danger');
                angular.element('.login-form .username, .login-form .grant_type').removeClass('ng-pristine').addClass('ng-invalid');

            } else if (status === 'reset') {
                angular.element('.login-button').html('Login').removeClass('btn-danger').addClass('btn-success');
                angular.element('.login-form .username, .login-form .grant_type').addClass('ng-pristine').removeClass('ng-invalid');
            }
            $('.login-form .username, .login-form .grant_type').focus(function () {
                loginButton('reset');
            });
        };

        function ChangePasswordButton(status) {
            if (status === 'load') {
                angular.element('.change-Password-button').html('<div class="loader">Loading...</div>').removeClass('btn-danger').addClass('btn-success');

            }
        };

        function togglePasswordExpireModal(daysRemaining) {
            vm.modalInstanceDelete = $modal.open({
                templateUrl: 'passwordExpireNoticeModal.html',
                controller: 'passwordExpireNoticeCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    data: function () {
                        var obj = { 'daysRemaining': daysRemaining };
                        return obj;
                    }
                }
            });

            vm.modalInstanceDelete.result.then(function () {
                $state.go('home');
            }, function () {
                // console.log('Cancelled');

            })['finally'](function () {
                vm.modalInstanceDelete = undefined  // <--- This fixes
            });

        }

        function togglePasswordHasExpiredModal() {
            vm.modalInstanceDelete = $modal.open({
                templateUrl: 'passwordExpiredModal.html',
                controller: 'passwordExpiredCtrl'
            });

            vm.modalInstanceDelete.result.then(function () {
                $state.go('home');
            }, function () {
                // console.log('Cancelled');

            })['finally'](function () {
                vm.modalInstanceDelete = undefined  // <--- This fixes
            });

        }

        function toggleShowErrorModal(msg) {

            vm.modalInstance = $modal.open({
                templateUrl: 'errorMessages.html',
                controller: 'errorMessagesCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    message: function () {
                        return $sce.trustAsHtml(msg);
                    }
                }
            });

        }

        function resetCookiesAndShowError() {
            loginButton('reset');

            $cookies.remove('token'); //doesn't work if the token was set by the back end
            //document.cookie = "token=;path=/;expires=Mon, 01 Jan 1970 01:01:01 GMT;domain=." + document.domain; //so nuke it from orbit
            $cookies.remove('token');
            $cookies.remove('agencyId');
            $cookies.remove('agencyName');
            $location.path('/login');
            var errormsg = "<b>Access to Breeze has been denied. Please contact support.</b> </br>  <b>Email:</b> <a href=\"mailto:policyservices@weston-ins.com?Subject=\" target=\"_top\">policyservices@weston-ins.com</a> </br><b>Phone: 1.800.262.1780</b>";
            toggleShowErrorModal(errormsg);
        };


        function postLogin() {
            $rootScope.isAdminAgent = false;
            
            if (vm.user.changePassword == 0) {
                if (vm.user.systemType == 'agencyLink') {
                    if (vm.user.username != '' && vm.user.password != '') {
                        loginButton('load');
                        angular.element('#frmLogin').attr('action', $rootScope.agencyLinkUrl);
                        __doPostBack('LoginButton', '');

                    } else {

                        loginButton('failure');
                    }

                } else {
                    loginButton('load');
                    wapService.signIn(vm.user).then(function (response) {
                        if (typeof response.access_token !== 'undefined') {
                            if (wapService.decryptData($cookies.get('userRole')) == 'Agent') {
                                var agent = JSON.stringify({
                                    "FirstAndMiddleName": response.firstName,
                                    "LastName": response.lastName,
                                    "EmailAddress": response.agentEmail,
                                    "PhoneNumber": response.agentPhone,
                                    "AgencyCode": response.agencyId
                                });

                                if (!isNaN(parseInt(window.atob(decodeURI($cookies.get('userName'))))) && (parseInt(window.atob(decodeURI($cookies.get('userName')))) === parseInt($cookies.get('agencyId')))) {
                                    $rootScope.isAdminAgent = true;
                                }
                                wapService.insertUpdateLoginDetails(agent).then(function (resp) {

                                }, function (err) {
                                    vm.errorMessage = "Some thing went wrong please try again";
                                    loginButton('reset');
                                });
                            }

                            wapService.checkLoggedinUserStatus(response.agencyId).then(function (res) {
                                if (res === true) {
                                    resetCookiesAndShowError();
                                } else {
                                    wapService.getAgencyNameByCode(response.agencyId).then(function (agencyName) {

                                                $rootScope.agencyName = agencyName;
                                                var expireDate = new Date();
                                                expireDate.setDate(expireDate.getDate() + 1);
                                                $cookies.put('agencyName', agencyName, { 'expires': expireDate });
                                                loginButton('success');
                                                if (response.isReadyForExpiration.toString() === "True") {
                                                    togglePasswordExpireModal(response.daysRemaining);
                                                } else {
                                                    $state.go('home');
                                                }
                                            },
                                                function (err) {
                                                    vm.errorMessage = "Some thing went wrong please try again";
                                                    loginButton('reset');
                                                });
                                }
                            },
                                function (err) {
                                    vm.errorMessage = "Some thing went wrong please try again";
                                    loginButton('reset');
                                })

                        } else {
                            if (response.error.toLowerCase() == "password expired") {
                                togglePasswordHasExpiredModal();
                                vm.errorMessage = response.error_description;
                                loginButton('reset');
                            } else {
                                toggleShowErrorModal(response.error_description);
                                loginButton('reset');
                            }
                        }
                    },
                    function (err) {
                        vm.errorMessage = "Some thing went wrong please try again";
                        loginButton('failure');
                    });
                }
            } else {
                ChangePasswordButton('load');
                angular.element('#frmLogin').attr('action', $rootScope.agencyLinkUrl);
                __doPostBack('ChangePasswordButton', '');
            }
        };

        $scope.Logout = function () {
            $rootScope.forceLoggingOut = true;
            $cookies.remove('token');
            $cookies.remove('agencyId');
            $cookies.remove('agencyName');
            $cookies.remove('userName');
            $location.path('/login');
        }

        function init() {
        }
    }
})();
