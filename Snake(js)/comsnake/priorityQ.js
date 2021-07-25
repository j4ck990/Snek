export class PriorityQueue {
    constructor() {
        this.ids = [];
        this.values = [];
        this.length = 0;
    }

    push(id, value) {
        let pos = this.length++;

        while (pos > 0) {
            const comp = pos - 1;
            const compValue = this.values[comp];
            if (value >= compValue) break;
            this.ids[pos] = this.ids[comp];
            this.values[pos] = compValue;
            pos = comp;
        }

        this.ids[pos] = id;
        this.values[pos] = value;
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.ids[0];
        
        for(let i = 0; i < this.length - 1; i++) {
            this.ids[i] = this.ids[i + 1]
            this.values[i] = this.values[i + 1]
        }

        this.ids[this.length - 1] = 0
        this.values[this.length - 1] = 0
        this.length--;

        return top;
    }
}
