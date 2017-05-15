import { CouponsController } from './coupons.controller.js';

export default angular
    .module('couponsModule', [])
    .controller('CouponsController', CouponsController)
    .config(function($stateProvider) {
        $stateProvider
            .state('coupons', {
            url: '/coupons',
            templateUrl: 'coupons/coupons.controller.html',
            controller: 'CouponsController',
            controllerAs: 'vm'
        })
})