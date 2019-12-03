class Promise {
    constructor(executor) {
        // 类型检测
        if (typeof executor !== 'function') {
            throw new TypeError(`Promise resolver ${executor} is not a function`)
        }

        this.ininValue()
        this.initBind()

        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    // 初始化值
    ininValue() {
        this.value = null // 终值
        this.reason = null // 拒因
        this.state = Promise.PENDING // 状态
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
    }

    // 绑定this
    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    resolve(value) {
        // 成功后操作
        if (this.state === Promise.PENDING) {
            this.state = Promise.FULFILLED
            this.value = value
            this.onFulfilledCallbacks.forEach(fn => fn(this.value))
        }
    }

    reject(reason) {
        // 失败后操作
        if (this.state === Promise.PENDING) {
            this.state = Promise.REJECTED
            this.reason = reason
            this.onRejectedCallbacks.forEach(fn => fn(this.reason))
        }
    }

    then(onFulfilled, onRejected) {
        // 参数校验
        if (typeof onFulfilled !== 'function') {
            onFulfilled = function (value) {
                return value
            }
        }

        if (typeof onRejected !== 'function') {
            onRejected = function (reason) {
                throw reason
            }
        }

        // 实现链式调用，并且改变后边then的值必须通过新的实例
        let promise2 = new Promise((resolve, reject) => {
            // 检查状态并执行对应函数
            if (this.state === Promise.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                });
            }

            if (this.state === Promise.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            }

            if (this.state === Promise.PENDING) {
                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(value)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })

                this.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(reason)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }

                    });
                })
            }

        })

        return promise2
    }

    all(promiseList) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(promiseList)) {
                return reject(new TypeError('argument must be an array'))
            }
            let countNum = 0;
            let promiseLen = promiseList.length;
            let resList = [];
            for (let i=0; i<promiseLen; i++) {
                resolve(promiseList[i]).then(res => {
                    countNum ++;
                    resList.push(res);
                    if(countNum === promiseLen) {
                        resolve(resList)
                    }
                }, error => {
                    reject(error)
                })
            }
        })
    }
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfulled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function (promise2, x, resolve, reject) {
    // x 与 promise 相等
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise'))
    }

    let called = false // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用

    if (x instanceof Promise) {
        // 判断x是否为promise
        x.then(
            value => {
                Promise.resolvePromise(promise2, value, resolve, reject)
            },
            reason => {
                reject(reason)
            }
        )
    } else if (toString.call(x) === '[object Object]' || typeof x === 'function') {
        // 判断是否为对象或函数
        try {
            const then = x.then
            // 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
            if (typeof then === 'function') {
                then.call(
                    x,
                    // resolvePromise 
                    value => {
                        if (called) return
                        called = true
                        Promise.resolvePromise(promise2, value, resolve, reject)
                    },
                    // rejectPromise
                    reason => {
                        if (called) return
                        called = true
                        reject(reason)
                    }
                )
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }

    } else {
        resolve(x)
    }
}

// 测试用~
Promise.deferred = function () {
    const defer = {}
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve
        defer.reject = reject
    })
    return defer
}

try {
    module.exports = Promise
} catch (e) {

}