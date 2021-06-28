import {GRID_SIZE} from "./comgrid.js"

class Node {
    constructor(x, y, position) {
        this.x = x
        this.y = y
        this.position = position
    }

    get_coords() {
        return {x: this.x, y: this.y}
    }

    get_position() {
        return this.position
    }
}

export class Hamilcycle {
    posList = []
    coordsList = []
    constructor() {
        for(let i = 0; i <= GRID_SIZE; i++ ) {
            this.coordsList[i] = [];
        }
        let pos_num = 1
        for(let tempy = 1; tempy <= GRID_SIZE; tempy++ ) {
            if (tempy % 2 === 1) {
                for (let tempx = 2; tempx <= GRID_SIZE; tempx++ ) {
                    let tempNode = new Node(tempx, tempy, pos_num)
                    this.posList[pos_num] = tempNode
                    this.coordsList[tempx][tempy] = tempNode
                    pos_num++
                }
            } else {
                for (let tempx = GRID_SIZE; tempx > 1 ; tempx-- ) {
                    let tempNode = new Node(tempx, tempy, pos_num)
                    this.posList[pos_num] = tempNode
                    this.coordsList[tempx][tempy] = tempNode
                    pos_num++
                }
            }
        }
        for (let final = GRID_SIZE; final > 0; final--) {
            let tempNode = new Node(1, final, pos_num)
            this.posList[pos_num] = tempNode
            this.coordsList[1][final] = tempNode
            pos_num++
        }
    }

    getNodePosition(x, y) {
        return this.coordsList[x][y].get_position()
    }

    getNodeCoords(pos) {
        return this.posList[pos].get_coords()
    }
}