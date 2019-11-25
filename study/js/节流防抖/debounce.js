// 防抖函数
function debounce(fun, time) {
    let timer = null
    return function(...args) {
        if(timer) clearTimeout(timer)

        timer = setTimeout(() => {
            fun.apply(this, args)
        }, time);
    }
}