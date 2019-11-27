// 测试用例
var a = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    },
    a1: undefined,
    a2: null,
    a3: 123
}

var sym1 = Symbol("a"); // 创建新的symbol类型
var sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol

a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";


function deepCopy(source, hash = new WeakMap()) {
    var isObj = function(obj) {
        return typeof obj === 'object' && obj !== null
    }

    if (!isObj(source)) return null;
    if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

    var target = Array.isArray(source) ? [] : {};

    hash.set(source, target); // 新增代码，哈希表设值

    // // ============= 新增代码
    let symKeys = Object.getOwnPropertySymbols(source); // 查找
    if (symKeys.length) { // 查找成功	
        symKeys.forEach(symKey => {
            if (isObject(source[symKey])) {
                target[symKey] = deepCopy(source[symKey], hash); 
            } else {
                target[symKey] = source[symKey];
            }    
        });
    }
    
    for(var key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            if (isObj(source[key])) {
                target[key] = deepCopy(source[key], hash)
            } else if (typeof source[key] === 'function') {
                target[key] = eval(target[key].toString())
            } else {
                target[key] = source[key]
            }
        }
        
    }

    return target;
}

a.boom = a;
let copy = deepCopy(a)
console.log('a :', a);
console.log('copy :', copy);
console.log(a.book === copy.book);
console.log(a.boom === copy.boom);