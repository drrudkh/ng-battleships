import { GameCtrl } from './ng/game.controller.js';
import { fieldDir } from './ng/field.directive.js';
import { navDir } from './ng/sidenav.directive.js';
import { GameFact } from './ng/game.factory.js';
import './main.scss';

export default angular
    .module('gameModule', [])
    .controller('GameCtrl', GameCtrl)
    .factory('GameFact', GameFact)
    .directive('fieldDir', fieldDir)
    .directive('navDir', navDir)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: 'modules/game/templates/game.controller.html',
            controller: 'GameCtrl',
            controllerAs: 'vm'
        })
            
        $urlRouterProvider.otherwise('/')
})