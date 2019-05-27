// 原始数据类型
// 原始数据类型包括：布尔值、数值、字符串、null、undefined
// 布尔值
var flag = false;
// let createdByNewBoolean: boolean = new Boolean(1); // new Boolean() 返回的是一个 Boolean 对象
var createdByBoolean = Boolean(1);
// 数值型
var num = 3;
var nanNumber = NaN;
// ES6 中的二进制表示法
var binaryLiteral = 10; // 会被编译为十进制
// ES6 中的八进制表示法
var octalLiteral = 484; // 会被编译为十进制
// 字符串
var myString = 'LIJING';
var tempString = "hello my name is " + myString;
// undefined null
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
var u = undefined;
var n = null;
// ndefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
var num1 = undefined;
// void  声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
var unusable = undefined;
