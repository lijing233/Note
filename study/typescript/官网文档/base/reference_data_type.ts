// Interfaces
interface Person {
  name: string;
  age: number;
}

// 定义时必须与接口一直，不能多，不能少，类型对应
let tom: Person = {
  name: 'Tom',
  age: 12
}

// 可选属性
interface Person2 {
  name: string;
  age?: number;
}

let Jerry: Person2 = {
  name: 'Jerry',
}

// 任意属性
interface Person3  {
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom2: Person3 = {
  name: 'Tom',
  gender: 'male'
};

// 只读属性  创建对象时必须有只读属性，并且不能再次对该属性赋值
interface Person4 {
  readonly id: number;
  name: string;
}
let tom3: Person4 = {
  id: 111,
  name: 'sss'
}
let tom4: Person4 = {
  name: '222'
}




// 数组
let arr: number[] = [1,2,3,'2'];
let arr1: any[] = [1,2,{},'ss'];
let arr2: Array<number> = [1,2,3,'']



// 函数
function sum (x: number, y: number) {
  return x + y;
}
sum(1,2)
sum(1,2,3)

let sum2 = function (x: number, y: number) {
  return x + y;
}
sum2(1,2)

let sum3: (x:number, y:number) => number = function (x: number, y:number) : number {
  return x + y;
}
sum3(2,3)


function buildName(firstName: string, lastName?: string) {
  if(lastName) {
    return firstName + lastName
  } else {
    return firstName
  }
}
let name1 = buildName('aa', 'bb')
let name2 = buildName('ss')

function buildName2(firstName:string, lastName:string = 'ming') {
  return firstName + lastName
}
let name3 = buildName2('fff')

function buildName3(firstName:string = 'test', lastName:string) {
  return firstName + lastName
}
buildName3('ss')



// 断言
function getLength(something: string | number): number {
  if((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}