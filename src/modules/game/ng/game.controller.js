export class GameCtrl {
    constructor($scope, GameFact) {
        this.$scope = $scope;
        this.fact = GameFact;
        this.shipSize = [5,4,3,3,2];
        this.ships = [{ type: 'Aircraft Carrier', size: 5 },
            { type: 'Battleship', size: 4 },
            { type: 'Cruiser', size: 3 },
            { type: 'Submarine', size: 3 },
            { type: 'Destroyer', size: 2 }
        ];
        this.shipObj = {
            size: 0,
            placed: false,
            dir: {
                x: null,
                y: null
            }
        };
        this.playerSelectionField = this.fact.populateArrays();
        this.npcSelectionField = this.fact.populateArrays();
        this.generateProbabilityMap();
        this.placeShips();
    }

    generateProbabilityMap() {
        let shipDensity = size => {
            for (let i = 0; i < this.npcSelectionField.length; i++) {
                for (let j = 0; j < this.npcSelectionField.length - size + 1; j++) {
                    for (let s = 0; s < size; s++) {
                        this.npcSelectionField[i][j + s].dst++;
                    }
                }
            }

            for (let i = 0; i < this.npcSelectionField.length - size + 1; i++) {
                for (let j = 0; j < this.npcSelectionField.length; j++) {
                    for (let s = 0; s < size; s++) {
                        this.npcSelectionField[i + s][j].dst++;
                    }
                }
            }
        }

        for (let size of this.shipSize) {
            shipDensity(size);
        }
    }

    placeShips() {
        let getPositions = size => {
            let getCoordinates = (dx, dy) => {
                let coord = [];
                let checkPositions = () => {
                    let x = Math.floor(Math.random() * (this.npcSelectionField.length - size + 1));
                    let y = Math.floor(Math.random() * (this.npcSelectionField.length - size + 1));
                    if (isAvailable(x, y, dx, dy)) {
                        coord.push({ x, y, dx, dy })
                    } else {
                        checkPositions();
                    }
                }

                checkPositions();
                return coord;

            }

            let isAvailable = (x, y, dx, dy) => {
                for (let i = 0; i < size; i++) {
                    if (this.npcSelectionField[x + i * dx][y + i * dy].isEmpty === false) {
                        return false;
                    }
                }

                return true;
            }

            return getCoordinates(1, 0).concat(getCoordinates(0, 1));
        }

        let randomizeDirection = arr => {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        let placeShip = () => {
            for (let size of this.shipSize) {
                let ship = randomizeDirection(getPositions(size));
                for (let i = 0; i < size; i++) {
                    this.npcSelectionField[ship.x + i * ship.dx][ship.y + i * ship.dy].isEmpty = false;
                }
            }
        }

        placeShip();
    }

    findHighestDensityCells() {
        let getEachColMaxValue = () => {
            let maxArr = this.npcSelectionField.reduce((arr, col, colIndex) => {
                let max = Math.max(0, ...col.map(e => e.dst));
                return arr.concat(
                    col.map(
                        (e, i) => ({ x: colIndex, y: i, dst: e.dst })
                    ).filter(e => e.dst === max)
                )
            }, []);

            return maxArr;
        }

        let getMaxDensity = arr => {
            return Math.max(0, ...arr.map(e => e.dst))
        }

        let getMaxDensityCoord = () => {
            let arr = getEachColMaxValue();
            return arr.filter(
                e => e.dst === getMaxDensity(arr)
            ).map(e => ({ x: e.x, y: e.y }))
        }

        return getMaxDensityCoord();
    }

    randomizeHighestDensityCells(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    getRangeOfPotentialPlacements(size, s) {
        return {
            top: Math.min(this.npcSelectionField.length - 1, Math.max(0, s.y - (size - 1))),
            right: Math.min(this.npcSelectionField.length - 1, Math.max(0, s.x + (size - 1))),
            bot: Math.min(this.npcSelectionField.length - 1, Math.max(0, s.y + (size - 1))),
            left: Math.min(this.npcSelectionField.length - 1, Math.max(0, s.x - (size - 1)))
        }
    }

    fireShot() {
        let shot = this.randomizeHighestDensityCells(this.findHighestDensityCells());
        let chooseAction = () => {
            switch (this.npcSelectionField[shot.x][shot.y].isEmpty) {
                case true:
                    this.huntMode(shot);
                    this.npcSelectionField[shot.x][shot.y].isMiss = true;
                    this.npcSelectionField[shot.x][shot.y].dst = -100;
                    break;

                case false:
                    this.targetMode(shot);
                    this.npcSelectionField[shot.x][shot.y].isHit = true;
                    this.npcSelectionField[shot.x][shot.y].dst = -100;
            }
        }

        chooseAction();

    }

    huntMode(s) {
        let substractFromDensity = size => {
            let rMax = this.getRangeOfPotentialPlacements(size, s);
            for (let i = rMax.top; i <= rMax.bot - (size - 1); i++) {
                for (let j = 0; j < size; j++) {
                    this.npcSelectionField[s.x][i + j].dst--;
                }

            }

            for (let i = rMax.left; i <= rMax.right - (size - 1); i++) {
                for (let j = 0; j < size; j++) {
                    this.npcSelectionField[i + j][s.y].dst--;
                }
            }
        }

        for (let size of this.shipSize) {
            substractFromDensity(size)
        }
    }

    targetMode(s) {
        let addToDensity = size => {
            let rMax = this.getRangeOfPotentialPlacements(size, s);
            for (let i = rMax.top; i <= rMax.bot - (size - 1); i++) {
                for (let j = 0; j < size; j++) {
                    this.npcSelectionField[s.x][i + j].dst+=2;
                }

            }

            for (let i = rMax.left; i <= rMax.right - (size - 1); i++) {
                for (let j = 0; j < size; j++) {
                    this.npcSelectionField[i + j][s.y].dst+=2;
                }
            }
        }

        for (let size of this.shipSize) {
            addToDensity(size)
        }
    }


}

GameCtrl.$inject = ['$scope', 'GameFact'];