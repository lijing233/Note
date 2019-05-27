function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = "Tom";
// let user = [0, 1, 2]; // 使用错误类型校验失败
console.log(sayHello(user));