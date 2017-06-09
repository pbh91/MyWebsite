(function () {
    'use strict';

    /* @ngdoc object
     * @name wapClient
     * @requires $urlRouterProvider
     *
     * @description
     *
     */
    var wpaApp = angular
        .module('wapClient', [
            'ui.router',
            'ngResource',
            'ngCookies',
            'login',
            'dashboard',
            'angular-loading-bar',
            'angularSpinner',
            'LocalStorageModule',
            'multi-select',
            'toaster',
            'ui.bootstrap',
            'angularFileUpload',
            'treeControl',
            'ui.slimscroll',
            'ngIntlTelInput',
            'common.envConfigConstant',
            'ngSanitize',
            "com.2fdevs.videogular",
            'ui.select',
            'oc.lazyLoad'
            /*  'mgcrea.ngStrap'*/
        ]);

    wpaApp
        .config(config);



    wpaApp.config(function (ngIntlTelInputProvider,$ocLazyLoadProvider) {
        ngIntlTelInputProvider.set({defaultCountry: 'us'});

        $ocLazyLoadProvider.config({
            debug: false
        });

    });
    angular.module('wapClient').run(
        function ($rootScope, usSpinnerService, $http, localStorageService, AuthenticationService, $location, envConfig, $state, $cookies, wapService) {
            $rootScope.remoteAPIUrl = envConfig.apiUrl;
            $rootScope.agencyLinkUrl = envConfig.agencyLinkUrl;
            function readTextFile(file) {
                var rawFile = new XMLHttpRequest();
                rawFile.open("GET", file, false);
                rawFile.onreadystatechange = function () {
                    if (rawFile.readyState === 4) {
                        if (rawFile.status === 200 || rawFile.status == 0) {
                            var allText = rawFile.responseText;
                            //alert(allText);
                            $rootScope.versionNumber = allText
                        } else {
                            $rootScope.versionNumber = "Unable to read version.txt";
                        }
                    }
                }
                rawFile.send(null);
            }
            readTextFile("version.txt");

            if (AuthenticationService.isLoggedIn()) {

            } else {

                $location.path('/login');
            }

            $rootScope.showView = false;

            $rootScope.startLoader = function () {
                $rootScope.showView = false;
                usSpinnerService.spin('spinner');
            };

            $rootScope.startSpinner = function () {
                usSpinnerService.spin('spinner');
            };

            $rootScope.stopSpinner = function () {
                $rootScope.showView = true;
                usSpinnerService.stop('spinner')
            };
            //added for scroll bar.
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.isCommercialWind = false;
                    if(toState.name == 'newBusiness.commercialWind'){
                        //   $rootScope.isCommercialWind = true;
                    }
                });

            $rootScope.help_clicked = function () {
                var currentPath = $location.path();
                var param = '';
                if (currentPath.indexOf('/home') > -1) {
                    param = 'DashBoard';
                }else if (currentPath.indexOf('preQualification') > -1) {
                    param = 'PreQualification';
                }else if (currentPath.indexOf('/fl/commercial/newBusiness/underwriting/') > -1) {
                    param = 'Underwriting';
                }else if (currentPath.indexOf('/fl/commercial/newBusiness/commercialWind') > -1) {
                    param = 'LocationsAndItems';
                }else if (currentPath.indexOf('/fl/commercial/newBusiness/documents') > -1) {
                    param = 'Documents';
                } else if (currentPath.indexOf('/fl/commercial/newBusiness/summary') > -1) {
                    param = 'Summary';
                }else if (currentPath.indexOf('/fl/commercial/boundProcess/quotes/') > -1 || currentPath.indexOf('/fl/commercial/bindingProcess/quotes/') > -1) {
                    param = 'AcceptedQuotes';
                }else if (currentPath.indexOf('/fl/commercial/boundProcess/interestsAndBilling/') > -1 || currentPath.indexOf('/fl/commercial/bindingProcess/interestsAndBilling/') > -1) {
                    param = 'InterestsAndBilling';
                }else if (currentPath.indexOf('fl/commercial/boundProcess/occupancyInfo/') > -1 || currentPath.indexOf('fl/commercial/bindingProcess/occupancyInfo/') > -1) {
                    param = 'Occupancy';
                }else if (currentPath.indexOf('fl/commercial/boundProcess/documents/') > -1 || currentPath.indexOf('fl/commercial/bindingProcess/documents/') > -1) {
                    param = 'AdditionalDocuments';
                }else if (currentPath.indexOf('fl/commercial/boundProcess/policyInfo/') > -1) {
                    param = 'PolicyInformation';
                }if (currentPath.indexOf('/fl/commercial/bindingProcess/summary/') > -1) {
                    param = 'Summary2';
                }

                var url = $state.href('help', {pagename: param});
                window.open(url,'_blank');
            };

            $rootScope.generateActivityReport = function () {
                var agencyCode = $cookies.get('agencyId');
                wapService.generateActivityReport().then(function (response) {
                        var file = new Blob([(response)], { type: "text/csv", encoding: "raw" });
                        if (file.size > 5) {
                            saveAs(file, 'Activity Report for' + agencyCode + '.csv');
                        } else {

                        }
                    },
                    function (err) {
                        // data:attachment/csv
                    });
            };


        });


    function config($stateProvider, $urlRouterProvider, $httpProvider, usSpinnerConfigProvider) {

        usSpinnerConfigProvider.setDefaults({ lines: 11, length: 0, width: 20, radius: 30, corners: 1, color: '#778899', speed: 1.2, trail: 20, shadow: false, hwaccel: false, top: '50%', left: '50%' });
        $urlRouterProvider.otherwise('/login');

        var interceptor = ['$rootScope', function ($rootScope) {
            return {
                'request': function (config) {
                    $rootScope.startSpinner();
                    return config;
                },

                'response': function (response) {
                    $rootScope.stopSpinner();
                    return response;
                },

                'responseError': function (rejection) {
                    $rootScope.stopSpinner();
                    return rejection;
                }
            };
        }];

        $httpProvider.interceptors.push(interceptor);

        /* $stateProvider
         .state('home', {
         url: '/home',
         templateUrl: 'agency/home.tpl.html',
         controller: 'homeCtrl as home'
         })
         .state('agency', {
         url: '/agency',
         templateUrl: 'agency/agency.tpl.html',
         controller: 'agencyManageCtrl as agency'
         })
         .state('login', {
         url: '/login',
         templateUrl: 'agency/login.tpl.html',
         controller: 'loginCtrl as login'
         });*/

    }

    angular.module('wapClient').filter('moment', function() {
        return function(dateString, format) {
            return moment(dateString).format(format);
        };
    });


    wpaApp.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {

        usSpinnerConfigProvider.setDefaults({
            lines: 13, // The number of lines to draw
            length: 14, // The length of each line
            width: 7, // The line thickness
            radius: 14, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 1, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 92, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent


        });
    }]);
})();
