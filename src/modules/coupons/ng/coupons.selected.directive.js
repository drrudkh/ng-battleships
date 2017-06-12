export function selectedCoupons() {
    return {
        replace: true,
        restrict: 'E',
        template: require('../templates/coupons.selected.directive.html'),
        scope: {
            list: '='
        }
    }
}