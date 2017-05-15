import { CouponsController } from './ng/coupons.controller.js';

export default angular
    .module('couponsModule', [])
    .controller('CouponsController', CouponsController)
    .config(function($stateProvider) {
        $stateProvider
            .state('coupons', {
            url: '/coupons',
            templateUrl: 'modules/coupons/templates/coupons.controller.html',
            controller: 'CouponsController',
            controllerAs: 'vm'
        })
})