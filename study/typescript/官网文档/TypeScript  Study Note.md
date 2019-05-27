# TypeScript  Study Note

## 1.单独创建的文件声明方法和变量时提示错误

![1558681119326](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1558681119326.png)

原因：

1. TypeScript 会添加一些 lib 作为全局运行的环境，这些环境的值是全局的[2][3]。TypeScript （当前版本为3.2）默认支持的是`ES5`环境，这个环境包含了`DOM`、`ES5`和`ScriptHost`这三个library。其中`DOM`会声明`name`这个变量（在`lib.dom.d.ts`中），也就是浏览器中的`window.name`。`index.ts`中的`name`也是全局的，所以产生了冲突
2. 如果一个`.ts`文件没有包含`import`或`export`，那么它会被视为脚本，该文件中所有的内容都会被视为全局的，其它文件可以直接使用[1]。反之如果使用了`import`或`export`，那该文件就会被视为一个`module`，里面的内容只有被别的文件`import`了才能使用。在上面这个文件中，`index.ts`没有使用`import`或`export`，所以这个变量`name`是全局的。

在默认状态下，`typescript` 将 `DOM typings` 作为全局的运行环境，所以当我们声明 `user`时， 与 `DOM` 中的全局 `window` 对象下的 `user` 属性出现了重名。因此，报了 `error TS2451: Cannot redeclare block-scoped variable 'user'.` 错误。

fixed:

1. 将运行环境由 `DOM typings` 更改成其他运行环境。
   我们可以在 `tsconfig.json` 中做一下声明：

```js
{
    "compilerOptions": {
        "lib": [
            "es2015"
        ]
    }
}
```

2. 在 Typescript 中，只要文件存在 import 或 export 关键字，都被视为 module

   脚本的最后一行，添加了 `export {};`。将文件声明为 module

## 2.修改完上面问题console.log报错

![1558681984472](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1558681984472.png)