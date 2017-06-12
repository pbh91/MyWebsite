(function () {
    'use strict';

    /* @ngdoc object
     * @name home
     * @requires $stateProvider
     *
     * @description
     *
     */
    angular
        .module('dashboard', [
            'ui.router'
        ]);

    angular
        .module('dashboard')
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'dashboard/home.tpl.html',
            controller: 'homeCtrl as home'
        });
    }


})();