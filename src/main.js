import 'angular';
import 'angular-ui-router';
// Libs wrapper
import './modules/coupons/index.js';



angular
  .module('app-bootstrap', [
    'ui.router',
    'couponsModule' // aici ai sa vezi ca e acelasi nume (adica test) ca modulu din test.controller.js
  ]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app-bootstrap']);
});
