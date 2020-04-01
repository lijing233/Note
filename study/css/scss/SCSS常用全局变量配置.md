# SCSS 常用全局mixin、动效、变量

## 1.常用mixin、animation、variable

对于常用的css代码块，可以使用mixin来定义，以提高编码效率和统一性

### mixin.scss

```scss
$baseFontSize:75px;
// px转rem
@function  px2rem($px){
	@return $px / $baseFontSize * 1rem;
}

//定位上下左右居中
@mixin center {  
	position: absolute;
	top: 50%;
    left: 50%;
	-webkit-transform: -webkit-translate(-50%, -50%);
	transform: translate(-50%, -50%)
}

//定位上下居中
@mixin center-y {  
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: -webkit-translateY(-50%);
}

//定位左右居中
@mixin center-x {  
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	-webkit-transform: -webkit-translateX(-50%);
}

// 超出一行显示点点
@mixin ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

// 超出多行显示点点
@mixin ellipsis-ln($line){
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow : hidden;
    -webkit-line-clamp: $line;
}

// 背景图
@mixin bgImage($url) { 
	background-image: url($url);
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

// 设置input placeholder 字体颜色
@mixin placeholder($c,$s){
    &::-webkit-input-placeholder{
        color:$c;
        font-size:$s;
    }
    &:-moz-placeholder{
        color:$c;
        font-size:$s;
    }
    &::-moz-placeholder{
        color:$c;
        font-size:$s;
    }
    &:-ms-input-placeholder{
        color:$c;
        font-size:$s;
    }
}

// 高度 和 行高 一致
@mixin hh($h) {
    height: $h;
    line-height: $h;
}

// 宽高
@mixin wh($width, $height) {
    width: $width;
	height: $height;
}

// 清除浮动
@mixin clearfloat() {
    &:before,
    &:after {
        content: '';
        display: table;
    }
    &:after{
        clear: both;
    }
}

// mask遮罩
@mixin mask($color: rgba(0,0,0, .5), $zindex: 1000) {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: $color;
    z-index: $zindex;
}


// 禁用样式
@mixin disabled($bgColor: #e6e6e6, $textColor: #ababab) {
    background-color: $bgColor !important;
    color: $textColor;
    cursor: not-allowed !important;
}

//flex 布局和 子元素 对其方式
@mixin flex($type: space-between){
	display: flex;
	justify-content: $type;
}

// shadow
@mixin shadow {
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
```



### animation.scss

```scss
@charset "UTF-8";

//-----------------------------------------------------
// animate.scss
// 提供6组动画 fade-in/out, shrink-in/out, up-in/out, down-in/out, left-in/out, right-in/out
//-----------------------------------------------------

%animation-basic {
    animation-duration: 0.3s;
    animation-fill-mode: both;
}

// fade in/out
//-----------------------------------------------------

@mixin animation-fade-in($className: fade, $from: 0) {
    $name: str-insert(In, $className, 0);

    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }
    @include animation-fade($name: $name, $from: $from);
}

@mixin animation-fade-out($className: fade, $to: 0) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @include animation-fade($name: $name, $from: 1, $to: $to);
}

// shrink in/out
//-----------------------------------------------------

@mixin animation-shrink-in($className: shrink, $from: 0.815) {
    $name: str-insert(In, $className, 0);
    
    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }
    @keyframes #{$name} {
        0% {
            opacity: 0;
            transform: scale($from);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
}

@mixin animation-shrink-out($className: shrink, $to: 1.185) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale($to);
        }
    }
}

// down in/out
//-----------------------------------------------------

@mixin animation-down-in($className: down, $value: 100%) {
    $name: str-insert(In, $className, 0);
    
    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 0;
            transform: translate(0, $value);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}

@mixin animation-down-out($className: down, $value: 100%) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(0, $value);
        }
    }
}

// up in/out
//-----------------------------------------------------

@mixin animation-up-in($className: up, $value: -100%) {
    $name: str-insert(In, $className, 0);
    
    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 0;
            transform: translate(0, $value);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}

@mixin animation-up-out($className: up, $value: -100%) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate(0, $value);
        }
    }
}

// left in/out
//-----------------------------------------------------

@mixin animation-left-in($className: left, $value: -100%) {
    $name: str-insert(In, $className, 0);
    
    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 0;
            transform: translate($value, 0);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}

@mixin animation-left-out($className: left, $value: -100%) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate($value, 0);
        }
    }
}

// right in/out
//-----------------------------------------------------

@mixin animation-right-in($className: right, $value: 100%) {
    $name: str-insert(In, $className, 0);
    
    .#{$className}-in {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 0;
            transform: translate($value, 0);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}

@mixin animation-right-out($className: right, $value: 100%) {
    $name: str-insert(Out, $className, 0);

    .#{$className}-out {
        animation-name: $name;
        @extend %animation-basic;
    }

    @keyframes #{$name} {
        0% {
            opacity: 1;
            transform: translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: translate($value, 0);
        }
    }
}
```



### variable.scss

定义常用的色值，保证页面颜色的统一性

```scss
// font
$font-family: Avenir, Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif, PingFang SC, Hiragino Sans GB, Microsoft YaHei;

// ----------------------------

$color-ca: #3782FF;
$color-cb: #FF5656;
$color-cc: #FFA61D;
$color-cd: #41C143;
$color-c1: #2C3B5E;
$color-c2: #445782;
$color-c3: #93A1C2;
$color-c4: #D1D7E6;
$color-c5: #E2E9F3;
$color-c6: #F7F9FF;


// --- primary color
// 品牌色（按钮、文字链、被激活表单轮廓等）
$c-primary: $color-ca;

// --- status colors
$c-error: $color-cb;
$c-warn: $color-cc;
$c-success: $color-cd;
$c-info: $color-c3;

// --- other main colors
$c-title: $color-c1; // 标题
$c-content: $color-c2; // 内容文字
$c-comment: $color-c3; // 提示或其他标注信息
$c-hint: $color-c4;
$c-divider: $color-c5; // 分割线，边框
$c-background: $color-c6;

```



## 2.vue中配置全局scss文件引入

### vue-cli2.x

```
npm i -D sass-resources-loader
```

```js
// build/utils 文件中，scss配置中添加一下代码
return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders("sass", {
      indentedSyntax: true,
      implementation: require("sass")
    }),
    scss: generateLoaders("sass",{
      implementation: require("sass")
    }).concat(
      {
        loader: 'sass-resources-loader',
        options: {
          // 需要全局引入的sass文件，这里引入了的scss文件，在所有的.vue文件都可以用到这份css样式，
          // 下面的resources接受一个数组，可以添加多个scss文件
          resources: path.resolve(__dirname, '../src/styles/variables.scss')
        }
      }
    ),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
```





### vue-cli3+

```js
// vue.config.js 添加一下配置
module.exports = {
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/styles/public.scss';`
      }
    }
  }
};
```

