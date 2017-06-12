export function coupon() {
    return {
        replace: true,
        restrict: 'E',
        template: require('../templates/coupons.directive.html'),
        scope: {
            list: '=',
            element: '='
        },
        link: function($scope) {
            $scope.selectCoupon = function(item) {
                $scope.$emit('selectedChange');
            }
        }
    }
}