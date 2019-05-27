// 原始数据类型
// 原始数据类型包括：布尔值、数值、字符串、null、undefined

// 布尔值
let flag: boolean = false;
// let createdByNewBoolean: boolean = new Boolean(1); // new Boolean() 返回的是一个 Boolean 对象
let createdByBoolean: boolean = Boolean(1);


// 数值型
let num: number = 3;
let nanNumber: number = NaN;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;  // 会被编译为十进制
// ES6 中的八进制表示法
let octalLiteral: number = 0o744; // 会被编译为十进制


// 字符串
let myString: string = 'LIJING';
let tempString: string = `hello my name is ${myString}`;


// undefined null
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
let u: undefined = undefined;
let n: null = null;
// ndefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
let num1: number = undefined;


// void  声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
let unusable: void = undefined;


// any
let myAny: any = 'hihihi';
myAny = 12;
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something;
something = 'seven';
something = 7;

// 如果声明并被赋值 默认为赋值类型
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;



// 联合类型
let union: number | string = 'sss';
union = 12;
union = {};
// 访问联合类型的方法
function getLength(something: string | number): number {
  return something.length; // 报错
}
function getString(something: string | number): string {
  return something.toString();
}

let myFavoriteNumber1: string | number;
myFavoriteNumber1 = 'seven';
console.log(myFavoriteNumber1.length); // 5
myFavoriteNumber1 = 7;
console.log(myFavoriteNumber1.length); // 编译时报错