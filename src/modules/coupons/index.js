import { couponsController } from './ng/coupons.controller.js';
import { coupon } from './ng/coupons.directive.js';
import { selectedCoupons } from './ng/coupons.selected.directive.js';
import './main.scss';

export default angular
    .module('couponsModule', [])
    .controller('couponsController', couponsController)
    .directive('coupon', coupon)
    .directive('selectedCoupons', selectedCoupons)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: 'modules/coupons/templates/coupons.controller.html',
            controller: 'couponsController',
            controllerAs: 'vm'
        })
        $urlRouterProvider.otherwise('/')
})