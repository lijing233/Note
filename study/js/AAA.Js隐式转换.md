# Js隐式转换

## Js数据类型

> **基本类型**

undefined  null  String  Number  Boolean  Symbol

> **引用类型**

Object Array Function Date



## 隐式转换方法

### 1.ToPrimitive

toPrimitive(value, type[number, string])  当需要将引用类型转换为基本类型时,则会调用toPrimitive来进行转换

params: value 需要转换的值  type期望转换的类型(默认值为number,对象为Date类型，则PreferredType被设置为String)

**type: number**

> 1、如果输入的值已经是一个原始值，则直接返回它
> 2、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
> 如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
> 3、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
> 4、否则，抛出TypeError异常。



**type:string**

> 1、如果输入的值已经是一个原始值，则直接返回它
> 2、否则，调用这个对象的toString()方法，如果toString()方法返回的是一个原始值，则返回这个原始值。
> 3、否则，如果输入的值是一个对象，则调用该对象的valueOf()方法，
> 如果valueOf()方法的返回值是一个原始值，则返回这个原始值。
> 4、否则，抛出TypeError异常。



#### ValueOf

1.Number String Boolean 三种基本类型调用valueOf 返回其值

2.Date

```javascript
let date = new Date()
date.valueOf() // 1577791647751
```

3.引用类型调用会返回其本身

```javascript
var a = new Array();
a.valueOf() === a; // true

var b = new Object({});
b.valueOf() === b; // true
```

4.特殊情况

```
let obj = {
	toString: function(){
		return 123;
	}
}
```



#### toString

1.Number、Boolean、String、Array、Date、RegExp、Function

```javascript
var num = new Number('123sd');
num.toString(); // 'NaN'

var str = new String('12df');
str.toString(); // '12df'

var bool = new Boolean('fd');
bool.toString(); // 'true'

var arr = new Array(1,2);
arr.toString(); // '1,2'

var d = new Date();
d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"

var func = function () {}
func.toString(); // "function () {}"

var reg = new RegExp()
reg.toString() // "/(?:)/"
```

2.Object Math

```javascript
var obj = new Object({});
obj.toString(); // "[object Object]"

Math.toString(); // "[object Math]"
```



### 2.ToNumber

| 参数      | 结果                                                         |
| --------- | ------------------------------------------------------------ |
| undefined | NaN                                                          |
| null      | +0                                                           |
| 布尔值    | true转换1，false转换为+0                                     |
| 数字      | 无须转换                                                     |
| 字符串    | 有字符串解析为数字，例如：‘324’转换为324，‘qwer’转换为NaN    |
| 对象(obj) | 先进行 ToPrimitive(obj, Number)转换得到原始值，在进行ToNumber转换为数字 |

### 3.ToString

| 参数      | 结果                                                         |
| --------- | ------------------------------------------------------------ |
| undefined | ‘undefined’                                                  |
| null      | ‘null’                                                       |
| 布尔值    | 转换为’true’ 或 ‘false’                                      |
| 数字      | 数字转换字符串，比如：1.765转为’1.765’                       |
| 字符串    | 无须转换                                                     |
| 对象(obj) | 先进行 ToPrimitive(obj, String)转换得到原始值，在进行ToString转换为字符串 |



## 隐式转换常见场景

### 1. +

因为string存在 + 运算, number 同样存在 所以加运算一般会出现隐式特殊的隐式转换,引用类型先转换为基本类型

其他数字运算符直接将非number类型转为number进行计算即可

eg:

```js
let obj = {}
1 + obj  // "1[object Object]"

{} + 1 // 直接控制台计算此结果为 1  因为在console里{}被认为是一个code block 
```



### 2. ==

```javascript
undefined == undefined // true
null == null // true
undefined == null // true
NaN == NaN // false
引用类型对比地址
string == number // 将string 转为 number
带有布尔值比较 需要将双方转为number
```

