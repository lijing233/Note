# Decorator 装饰器

javascript中也有`decorator`相关的提案，只是目前node以及各浏览器中均不支持。只能通过安装babel插件来转换代码，插件名叫这个：`transform-decorators-legacy`。

## 1.类的装饰

eg1:添加静态属性

```js
@addColor
class Flower {}
function addColor(target) {
  target.color = "red";
}
console.log(Flower.color);  // red
let f1 = new Flower();
console.log(f1.color); // undefined
```

eg2:添加多个原型属性

```js
// 多参数
let mixObj = {
  nickName: "leo",
  say() {
    console.log("hello");
  }
};
@mixin(mixObj)
class Person {}
function mixin(...obj) {
  console.log(...obj);
  return function(target) {
    Object.assign(target.prototype, ...obj);
  };
}

console.dir(Person.nickName); // leo
let p1 = new Person();
p1.say() // hello
```

## 2.类方法的装饰

```js
class Animal {
  constructor(name) {
    this.myName = name;
    this.list = [1, 2, 3, 4];
  }

  @readonly
  say() {
    console.log(this.myName + "!!!!");
  }

  @nonewritable
  nickName = "lili";
}

function readonly(target, name, descriptor) {
  // target 类的原型对象
  // name 装饰的属性名
  // descriptor 该属性的描述对象
  // descriptor {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  target.age = 12;
  console.log("target :", target);
  console.log("name :", name);
  console.log("descriptor :", descriptor);
}

function nonewritable(target, name, descriptor) {
  console.log("ddd", descriptor);
  descriptor.writable = false;
  return descriptor;
}

let cat = new Animal("cat");
console.log(cat.myName);
console.dir(cat);
console.dir(Animal);
console.log(cat.age);
cat.nickName = "qq";
console.log(cat.nickName); // lili 已设置不允许修改
cat.say();
cat.say();
```

对类方法添加劫持 打印日志或其他处理

```js
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

