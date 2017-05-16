import 'angular';
import 'angular-ui-router';
// Libs wrapper

// Module wrapper
import 'modules';



angular
  .module('app-bootstrap', [
    'ui.router',
    'modules'
  ]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app-bootstrap']);
});
