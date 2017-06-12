export function couponsController($scope) {
    let vm = this;
    vm.selectedOffers = 0;
    vm.confirmedCoupons = [];
    vm.couponList = [
        {
            name: 'Offer 1',
            price: '$24.95',
            selected: false,
            hidden: false
        },
        {
            name: 'Offer 2',
            price: '$34.95',
            selected: false,
            hidden: false
        },
        {
            name: 'Offer 3',
            price: '$10% OFF',
            selected: false,
            hidden: false
        },
         {
            name: 'Offer 4',
            price: '$24.95',
            selected: false,
            hidden: false
        },
         {
            name: 'Offer 5',
            price: '$34.95',
            selected: false,
            hidden: false 
        },
         {
            name: 'Offer 6',
            price: '$10% OFF',
            selected: false,
            hidden: false 
        },
    ];
    
    $scope.$on('selectedChange', function() {
        vm.selectedOffers = 0;
        vm.couponList.forEach(function(item) {
            if ( item.selected === true ) {
                vm.selectedOffers++;
            }
        })
    })
    
    vm.deleteCoupon = function() {
        vm.couponList.forEach(function(item) {
            item.hidden = item.selected
        })
    }
    
    vm.resetCoupons = function() {
        vm.selectedOffers = 0;
        vm.couponList.forEach(function(item) {
            item.hidden = false;
            item.selected = false;
        })
    }
    
    vm.confirmSelection = function() {
        vm.couponList.forEach(function(item) {
            if ( item.selected === true && item.hidden === false ) {
                vm.confirmedCoupons.push(item);
            }
        })
    }
    
}