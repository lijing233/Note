// 1.浅拷贝
// Object.assign()
let a = {
    name: 'lijing',
    title: {
        num: '001'
    }
}

let b = Object.assign({}, a)

console.log(b);

a.name = 'liming'

a.title.num = '002'

console.log(a);
console.log(b);

// 解构
let c = {
    name: 'lijing',
    title: {
        num: '001'
    }
}

let d = {...c}

console.log(d);


// 数组
let arr1 = ['1', 0, [1,2]]
let arr2 = arr1.slice()
console.log('arr2 :', arr2);
arr1[0] = '11'
arr1[2][0] = 8

console.log('arr1 :', arr1);
console.log('arr2 :', arr2);