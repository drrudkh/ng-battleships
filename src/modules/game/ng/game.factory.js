export class GameFact {
    constructor() {
        this.options = {
            count: 10,
            cellObj: {
                isEmpty: true,
                isHit: false,
                isMiss: false,
                isVisited: false,
                dst: 0
            }
        }
    }

    populateArrays() {
        let outerArr = [];
        for (let i = 0; i < this.options.count; i++) {
            let innerArr = [];
            for (let j = 0; j < this.options.count; j++) {
                innerArr[j] = Object.assign({}, this.options.cellObj);
            }
            outerArr[i] = innerArr;
        }

        return outerArr;
    }
}