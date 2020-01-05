class Queue {
    constructor (max = 100) {
        this.head = 0
        this.tail = 0
        this.data = new Array(max)
        this.size = 0
        this.max = max
    }

    // 入队
    enqueue(x) {
        if (this.size === this.max) {
            return new Error('overflow')
        }

        this.data[this.tail] = x
        this.size ++
        if (this.tail === this.max -1) {
            this.tail = 0
        } else {
            this.tail ++
        }
    }

    // 出队
    dequeue() {
        if (this.size === 0) {
            return new Error('underflow')
        }

        const x = this.data[this.head]
        this.data[this.head] = undefined
        this.size --
        if (this.head === this.max -1) {
            this.head = 0
        } else {
            this.head ++
        }
        return x
    }

    get length() {
        return this.size;
    }
}