# 使用webpack-spritesmith生成雪碧图

**[插件官网 webpack-spritesmith](https://github.com/mixtur/webpack-spritesmith)**

安装

```shell
npm install webpack-spritesmith --save
```

vue.config.js配置

```js
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

var templateFunction = function (data) {
  var getRem = function(val) {
    const base = 36;
    return parseInt(val)/base + 'rem'
  }
  var shared = '@mixin icon { background-image: url(I);background-size: W H;}'.replace('I', data.sprites[0].image).replace('W', getRem(data.spritesheet.width))
    .replace('H', getRem(data.spritesheet.height))
  var perSprite = data.sprites.map(function (sprite) {
    return '@mixin icon-N { width: W; height: H; background-position: X Y; }'
      .replace('N', sprite.name)
      .replace('W', getRem(sprite.width))
      .replace('H', getRem(sprite.height))
      .replace('X', getRem(sprite.offset_x))
      .replace('Y', getRem(sprite.offset_y));
  }).join('\n');
  return shared + '\n' + perSprite;
}

module.exports = {
    configureWebpack: (config) => {
        config.resolve.modules.push('./src/images')
        config.plugins.push(
          new SpritesmithPlugin({
            /*
            需要合成雪碧图的目标文件夹
            */
            src: {
              cwd: path.resolve(__dirname, './src/images/icon'),
              glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
              image: path.resolve(__dirname, './src/images/sprite.webp'),
              css: [
                [path.resolve(__dirname, './src/common/scss/sprite.scss'), {
                  // 引用自己的模板
                  format: 'function_based_template'
                }],
              ]
            },
            // 自定义css处理模板
            customTemplates: {
              'function_based_template': templateFunction,
            },
            // 样式文件中调用雪碧图地址
            apiOptions: {
              cssImageRef: '~@/images/sprite.png',

            },
            // 图片边距
            spritesmithOptions: {
              padding: 20
            }
          })
        )
    }
}
```

打包后生成：

src/common/scss/sprite.scss

```scss
@mixin icon { background-image: url(~@/images/sprite.png);background-size: 4.555555555555555rem 4.277777777777778rem;}
@mixin icon-arrow { width: 0.6666666666666666rem; height: 0.6666666666666666rem; background-position: -3.888888888888889rem 0rem; }
@mixin icon-back { width: 1.3888888888888888rem; height: 1.3888888888888888rem; background-position: 0rem 0rem; }
@mixin icon-circle { width: 0.6666666666666666rem; height: 0.6666666666666666rem; background-position: -3.888888888888889rem -1.2222222222222223rem; }
@mixin icon-close { width: 1.3888888888888888rem; height: 1.3888888888888888rem; background-position: -1.9444444444444444rem 0rem; }
@mixin icon-cur { width: 0.6111111111111112rem; height: 0.6111111111111112rem; background-position: 0rem -3.6666666666666665rem; }
@mixin icon-question { width: 0.7777777777777778rem; height: 0.7777777777777778rem; background-position: -1.7222222222222223rem -1.9444444444444444rem; }
@mixin icon-selected { width: 1.1666666666666667rem; height: 1.1666666666666667rem; background-position: 0rem -1.9444444444444444rem; }
@mixin icon-watch { width: 0.6666666666666666rem; height: 0.6666666666666666rem; background-position: -3.888888888888889rem -2.4444444444444446rem; }
```

src/images/sprite.png



使用

```
@import '@/common/scss/sprite.scss';
.icon-continer {
	@include icon;
    @include icon-back;
}
```

