import 'angular';
import 'angular-ui-router';
import 'main.scss';
// Libs wrapper
import './test.controller.js';


angular
  .module('app-bootstrap', [
    'ui.router',
    'test' // aici ai sa vezi ca e acelasi nume (adica test) ca modulu din test.controller.js
  ]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app-bootstrap']);
});
