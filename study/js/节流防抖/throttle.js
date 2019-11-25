// 节流函数 每隔time执行一次函数
const throttle = function(fun, time = 100) {
    let base = 0
    return function(...args) {
        let now = +new Date()
        if (now - base > time) {
            base = now
            fun.apply(this, args)
        }
    }
}
