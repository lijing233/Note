# Commander

使用commander可以进行cli命令的封装



## install

```shell
$ npm install commander
```



## api

### 

### version

```shell
const program = require('commander');
program
  .version('0.0.1')
  .parse(process.argv);
  
#执行
node index.js -V
#输出
0.0.1

#如果希望程序响应-v选项而不是-V选项，
#只需使用与option方法相同的语法将自定义标志传递给version方法
program
  .version('0.0.1', '-v, --version')
```



### option

使用option来定义带选项的 commander

选项会被放到 Commander 对象的属性上；

多词选项如"--template-engine"会被转为驼峰法`program.templateEngine`。多个短标识可以组合为一个参数，如`-a -b -c`等价于`-abc`

示例：`.option('-n, --name <items1> [items2]', 'name description', 'default value')`



1. boolean类型 不是用<>或[];

   ```shell
   program
     .option('-t --type', 'this is type');
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # 输出
   node index.js
   {type: undefined}
   
   node index.js -t
   {type: true}
   ```

   

2. <> 传值必须 []传值不必须

   ```shell
   program
     .option('-n --nickname <name>', 'this is nicknam', 'lili');
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # 输出
   node index.js
   {nickname: 'lili'}
   
   node index.js -n
   // error: option '-n --nickname <name>' argument missing
   
   node index.js -n qiqi
   { nickname: 'qiqi' }
   
   node index.js --nickname=qiqi
   node index.js --nickname qiqi
   { nickname: 'qiqi' }
   ```

   

   ```shell
   program
     .option('-c --color [mycolor]', 'my color', 'blue');
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # test
   node index.js
   { color: 'blue' }
   
   node index.js -c
   { color: 'blue' }
   
   node index.js -c red
   { color: 'red' }
   ```

   

3. no-

   参数前添加no- 可使默认值变为false

   ```shell
   program
     .option('-m --no-flag', 'this is flag1')
     .option('-n --flag2', 'this is flag2');
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # 输出
   node index.js
   { flag: true, flag2: undefined }
   
   node index.js -mn
   { flag: false, flag2: true }
   ```

   其值可以被覆盖

   ```shell
   program
     .option('--nickname', 'my nick name', 'lili')
     .option('--no-nickname', 'no nicknane');
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # test
   node index.js --nickname --no-nickname
   { nickname: false }
   node index.js --no-nickname --nickname
   { nickname: 'lili' }
   ```

4. 传入处理函数

   ```shell
   
   function myParseInt(value, dummyPrevious) {
     // parseInt takes a string and an optional radix
     return parseInt(value) + 10;
   }
   
   function increaseVerbosity(dummyValue, previous) {
     return previous + 1;
   }
   
   program
     .option('-i --intval <number>', 'need int val', myParseInt)
     .option('-m --addtext', 'add text', increaseVerbosity, 1);
   
   program.parse(process.argv);
   console.log(program.opts());
   
   # 输出
   node index.js -i 10
   {intval: 20}
   
   node index.js -mmmmm
   {addtext: 5}
   ```

5. .requiredOption

   ```shell
   const program = require('commander');
   
   program
     .requiredOption('-c, --cheese <type>', 'pizza must have cheese');
   
   program.parse(process.argv);
   
   $ pizza
   error: required option '-c, --cheese <type>' not specified
   ```

   

### command

command(<>, [])

```shell
program
  .command('init <name> [desc]')
  .description('init your project')
  .option('-n --name [name]', 'myname', 'nnnnnn')
  .action((name, desc, cmd) => {
    console.log(name);
    console.log(desc);
    console.log(cmd.name)
    console.log('init init init');
  });

program.parse(process.argv);

# test
node index.js init lijing "my project"
lijing
my project
nnnnnn
init init init
```



添加多个可变参数

```shell
program
  .command('testcmd [desc...]')
  .action((desc, cmd) => {
    console.log(desc);
  });
  
$ node .\bintest\index.js testcmd  params1 params2
[ 'params1', 'params2' ]
```



alias 定义别名 可以使用别名调用

```shell
program
  .command('testcmd [desc]')
  .alias('ttt')
  .usage('[options] <file ...>')
  .description('this is desc')
  .action((desc, cmd) => {
    console.log(desc);
  });

program.parse(process.argv);

node index.js testcmd --help
```





### 添加正则

```shell
program
  .version('0.1.0')
  .option('-s --size <size>', 'Pizza size', /^(large|medium|small)$/i, 'medium')
  .option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
  .parse(process.argv);
 
console.log(' size: %j', program.size);
console.log(' drink: %j', program.drink);

# 执行结果
node index.js -s hahah -d hehe
 
 size: "medium"
 drink: true
 #size 没有输入值则报错，不符合正则则为默认值，符合正则则为size
 #drink 没有输入则报undefined，不符合正则则为true，符合正则则为drink
```









## 配合inquirer.js使用

https://github.com/SBoudrias/Inquirer.js

```
var inquirer = require('inquirer');
inquirer
  .prompt([
  	{},
  	{},
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });
```



```js

{ 
  // 表示提问的类型，下文会单独解释
  //可能值：list|rawlist|expand|checkbox|confirm|input|password|editor
  type: String, 
  // 在最后获取到的answers回答对象中，作为当前这个问题的键
  name: String, 
  // 打印出来的问题标题，如果为函数的话
  message: String|Function, 
  // 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。
  //假如为函数时，函数第一个参数为当前问题的输入答案。
  default: String|Number|Array|Function, 
  // 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。
  //为数组时，数组的每个元素可以为基本类型中的值。
  choices: Array|Function, 
  // 接受用户输入，并且当值合法时，函数返回true。
  //当函数返回false时，一个默认的错误信息会被提供给用户。
  validate: Function, 
  // 接受用户输入并且将值转化后返回填充入最后的answers对象内。
  filter: Function, 
  // 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。
  //也可以是简单类型的值。
  when: Function|Boolean, 
  // 改变渲染list,rawlist,expand或者checkbox时的行数的长度。
  pageSize: Number, 

```

```js
 //问题对象中必须有type,name,message,choices等属性，
 //同时，default选项必须为默认值在choices数组中的位置索引(Boolean)
 List{type: 'list'}
 //与List类型类似，不同在于，list打印出来为无序列表，而rawlist打印为有序列表
 Raw list {type: 'rawlist'}
 //同样是生成列表，但是在choices属性中需要增加一个属性：key，这个属性用于快速选择问题的答案。
 //类似于alias或者shorthand的东西。同时这个属性值必须为一个小写字母
 Expand{type: 'expand'}
 //其余诸项与list类似，主要区别在于，是以一个checkbox的形式进行选择。
 //同时在choices数组中，带有checked: true属性的选项为默认值。
 Checkbox{type: 'checkbox'}
 //提问，回答为Y/N。若有default属性，则属性值应为Boolean类型
 Confirm{type: 'confirm'}
 //获取用户输入字符串
 Input{type: 'input'}
 //与input类型类似，只是用户输入在命令行中呈现为XXXX
 Password{type: 'password'}
 //终端打开用户默认编辑器，如vim，notepad。并将用户输入的文本传回
 Editor{type: 'editor'}

```

