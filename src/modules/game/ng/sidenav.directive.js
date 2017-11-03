export function navDir() {
	return {
		restrict: 'E',
		replace: true,
		template: require('../templates/sidenav.directive.html'),
		link: function($scope, el) {
			
		}
	}
}