import { GRID_SIZE, outsideGrid } from "./comgrid.js"
import {getCurrentFoodPosition} from "./comfood.js"
import {getSnakeHead, onSnake, equalPositions} from "./comsnake.js"
import {PriorityQueue} from "./priorityQ.js"



let directions = []

class aNode {
    constructor(coords, prev) {
        
        this.coords = coords
        this.visited = false
        this.dist = 0
        this.prev = prev

    }

    changeDist(dist){
        this.dist = dist
    }

    changeVisit() {
        this.visited = true
    }

    changePrev(newprev) {
        this.prev = newprev
    }
}

export function will_survive(coords) {
    return !(onSnake(coords, { ignoreHead : false }) || outsideGrid(coords))
}

export function getAStarDir() {

    runAStar()
    return directions.shift()

}

function getLivableDir(coord) {
    let canRight = will_survive({x: coord.x + 1, y: coord.y})
    let canLeft = will_survive({x: coord.x - 1, y: coord.y})
    let canUp = will_survive({x: coord.x, y: coord.y - 1})
    let canDown = will_survive({x: coord.x, y: coord.y + 1})

    if(canRight) {
        return {x: 1, y: 0}
    } else if(canLeft) {
        return {x: -1, y: 0}
    } else if(canUp) {
        return {x: 0, y: -1}
    } else {
        return {x: 0, y: 1}
    } 


}

function runAStar() {
    directions = []
    let sortedVal = new PriorityQueue()
    let food = getCurrentFoodPosition()
    let head = getSnakeHead()
    let aNodeLst = []
    for(let i = 0; i <= GRID_SIZE; i++ ) {
        aNodeLst[i] = [];
    }
    let headNode = new aNode(head, head)
    aNodeLst[head.x][head.y] = headNode
    let currAnode = headNode
    while(!equalPositions(currAnode.coords, food)) {
        currAnode.changeVisit()
        addNeigh(sortedVal, aNodeLst, currAnode, food)
        while (currAnode.visited) {
        
            if (sortedVal.length === 0) {
                console.log("IM TRAPPED")
                let tempdir = getLivableDir(head)
                console.log(tempdir)
                directions.unshift(tempdir)
                return
            }
            currAnode = sortedVal.pop()

        }
    }

    while(!equalPositions(currAnode.coords, head)) {
        let dir = {x: currAnode.coords.x - currAnode.prev.coords.x, y: currAnode.coords.y - currAnode.prev.coords.y}
        directions.unshift(dir)
        currAnode = currAnode.prev
    }

    return
}


function addNeigh(pq, nodelst, prevNode, food) {
    let coord = prevNode.coords
    let canRight = will_survive({x: coord.x + 1, y: coord.y})
    let canLeft = will_survive({x: coord.x - 1, y: coord.y})
    let canUp = will_survive({x: coord.x, y: coord.y - 1})
    let canDown = will_survive({x: coord.x, y: coord.y + 1})
    let tempNode, tempDist, newX, newY

    if(canRight) {
        newX = coord.x + 1
        newY = coord.y
        if(nodelst[newX][newY] != null) {
            if(!nodelst[newX][newY].visited) {
                nodelst[newX][newY].changePrev(prevNode)
            }
        } else {
            tempNode = new aNode({x: newX, y: newY}, prevNode)
            nodelst[newX][newY] = tempNode
            tempDist = Math.abs(food.x - newX) + Math.abs(food.y - newY)
            tempNode.changeDist(tempDist)
            pq.push(tempNode, tempDist) 
        }
    } else {
    }

    if(canLeft) {
        newX = coord.x - 1
        newY = coord.y
        if(nodelst[newX][newY] != null) {
            if(!nodelst[newX][newY].visited) {
                nodelst[newX][newY].changePrev(prevNode)
            }
        } else {
            tempNode = new aNode({x: newX, y: newY}, prevNode)
            nodelst[newX][newY] = tempNode
            tempDist = Math.abs(food.x - newX) + Math.abs(food.y - newY)
            tempNode.changeDist(tempDist)
            pq.push(tempNode, tempDist)
        }
    } 

    if(canUp) {
        newX = coord.x
        newY = coord.y - 1
        if(nodelst[newX][newY] != null) {
            if(!nodelst[newX][newY].visited) {
                nodelst[newX][newY].changePrev(prevNode)
            }
        } else {
            tempNode = new aNode({x: newX, y: newY}, prevNode)
            nodelst[newX][newY] = tempNode
            tempDist = Math.abs(food.x - newX) + Math.abs(food.y - newY)
            tempNode.changeDist(tempDist)
            pq.push(tempNode, tempDist)
        }
    } 

    if(canDown) {
        newX = coord.x
        newY = coord.y + 1
        if(nodelst[newX][newY] != null) {
            if(!nodelst[newX][newY].visited) {
                nodelst[newX][newY].changePrev(prevNode)
            }
        } else {
            tempNode = new aNode({x: newX, y: newY}, prevNode)
            nodelst[newX][newY] = tempNode
            tempDist = Math.abs(food.x - newX) + Math.abs(food.y - newY)
            tempNode.changeDist(tempDist)
            pq.push(tempNode, tempDist)
        }
    } 
}

