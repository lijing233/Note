```js
var parent = Object.create(Object.prototype, {
    a: {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true            
    }
});
```

 child有两个属性b和c，其中b为可枚举属性，c为不可枚举属性。 

```js
var child = Object.create(parent, {
    b: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    },
    c: {
        value: 3,
        writable: true,
        enumerable: false,
        configurable: true
    }
});
```



## for in

```js
for (var key in child) {
    console.log(key);
}
// > b
// > a
```

 for in会输出自身以及原型链上可枚举的属性。 

 如果仅想输出自身的属性可以借助 [hasOwnProperty](http://yanhaijing.com/javascript/2015/05/08/member-of-object/)。可以过滤掉原型链上的属性。 

```js
for (var key in child) {
    if (child.hasOwnProperty(key)) {
        console.log(key);
    }
}
// > b
```



## Object.keys

```js
console.log(Object.keys(child));
// > ["b"]
```

 Object.keys的效果和for in+hasOwnProperty的效果是一样的 



## Object.getOwnPropertyNames

```js
console.log(Object.getOwnPropertyNames(child));
// > ["b", "c"]
```

