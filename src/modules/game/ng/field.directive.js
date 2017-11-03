export function fieldDir() {
    return {
        restrict: 'E',
        template: require('../templates/field.directive.html'),
        scope: {
            field: '=',
            shipOpt: '=',
            type: '@'
        },
        link: function($scope) {
            let prevPlacement = [];
            $scope.placeShip = function(x, y) {
                let occupyCells = function(x, y, dx, dy) {
                    if (isAvailable(x, y, dx, dy)) {
                        prevPlacement.push({ x, y, dx, dy });
                        for (let i = 0; i < $scope.shipOpt.size; i++) {
                            $scope.field[x + i * dx][y + i * dy].isEmpty = false;
                        }
                    }
                }

                let isAvailable = function(x, y, dx, dy) {
                    for (let i = 0; i < $scope.shipOpt.size; i++) {
                        if (isOutOfBounds(x, y, dx, dy, i)) {
                            return false;
                        }

                        if ($scope.field[x + i * dx][y + i * dy].isEmpty === false) {
                            return false;
                        }
                    }

                    return true;
                }

                let isOutOfBounds = function(x, y, dx, dy, i) {
                    if ($scope.field[x + i * dx] === undefined || $scope.field[x + i * dx][y + i * dy] === undefined) {
                        return true;
                    }

                    if ($scope.field[x + i] > ($scope.field.length - 1) && $scope.field[y + i] > ($scope.field.length - 1)) {
                        return true;
                    }

                    return false;
                }

                let removeOldPlacement = function() {
                    let o = prevPlacement[0];
                    for (let i = 0; i < 5; i++) {
                        $scope.field[o.x + i * o.dx][o.y + i * o.dy].isEmpty = true;
                    }
                    prevPlacement.shift();
                }

                occupyCells(x, y, $scope.shipOpt.dir.x, $scope.shipOpt.dir.y);
                if (prevPlacement.length > 1) {
                    removeOldPlacement();
                }

            }
        }
    }
}