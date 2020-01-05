// 栈
// 栈是一种遵循后进先出(LIFO)的数据结构
// 主要的操作，分别是push和pop
// 
// 初始化：
// 有一块连续的存储空间
// 栈顶
// 栈的长度

// push操作：
// 向栈中添加新的元素
// 栈顶向后挪动一个位置，指向最新的数据地址
// 如果栈满了继续push的化，会抛出overflow的错误

// pop操作：
// 返回栈顶数据
// 栈顶向前挪动一个位置，指向前一个数据地址
// 如果栈中没有数据继续pop的话，会抛出underflow的错误

class Stack {
    constructor(max = 100) {
        this.data = new Array(max)
        this.top = -1 // 栈顶指针
        this.max = max
    }

    pop() {
        if(this.top === -1) {
            return new Error('underflow')
        }
        const x = this.data[top]
        top --
        return x
    }

    push(item) {
        if(this.top === this.max -1) {
            return new Error('overflow')
        }
        this.top ++
        this.data[top] = item
    }

    get length() {
        return this.top + 1
    }
}