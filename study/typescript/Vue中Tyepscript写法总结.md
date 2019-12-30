# Vue中Typescript常用写法

## 使用Ts的原因

待添加...



## 创建项目

使用vue-cli3.x创建项目，选择typescript配置项，及class写法



## 项目迁移

> 依赖项

`@vue/cli-plugin-typescript` `typescript`

`vue-class-component` `vue-property-decorator`

>  `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

待添加...



## API迁移

主要写法参考

[vue-property-decorator](https://npm.taobao.org/package/vue-property-decorator)

[vue-class-component](https://github.com/vuejs/vue-class-component)

[vue官网](https://cn.vuejs.org/v2/guide/typescript.html#ad)



### 全局生命文件

在cli生成项目中含有一个`shims-vue.d.ts`文件，因为在ts文件中是无法识别vue文件的，所以添加声明让ts能够识别

```typescript
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

```



### .vue文件写法

> 父组件

```vue
<template>
  <div class="container">
    <div>data: {{ myMsg }}</div>
    <div>{{ computedMsg }}</div>
    <div>props: {{ propMessage }}</div>
    <div><input type="text" v-model="inpVal" /></div>
    <div><button @click="onButtonClick">click</button></div>
    <div>.sync绑定：{{ syncData }}</div>
    <div>子组件v-model: {{ modelData }}</div>
    <div>emit val {{ sonVal }}</div>
    <div><button @click="activeRef">active ref</button></div>
    <div>mixin: {{ mixinValue }}</div>
    <div>测试： {{ name }}</div>
    <SonComp
      :syncData.sync="syncData"
      v-model="modelData"
      @sonChange="sonChange"
      ref="sonComp"
    ></SonComp>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Provide,
  Ref
} from "vue-property-decorator";
import SonComp from "./SonComp.vue";
import MyMixin from "@/mixin/mixin.ts";
@Component({
  name: "Test",
  props: {
    propMessage: {
      type: String,
      default: "Props"
    }
  },
  components: {
    SonComp
  }
})
export default class extends MyMixin {
  // ref
  @Ref("sonComp") readonly sonRef!: SonComp;
  // data数据
  private myMsg = "DataMsg";
  syncData = "syncData";
  inpVal = "";
  modelData = "";
  sonVal = "";
  // 两种写法均可
  data() {
    return {
      name: "lijing"
    };
  }
  // computed
  get computedMsg() {
    return "computed:" + this.myMsg;
  }
  // watch
  @Watch("inpVal", { immediate: true, deep: true })
  onInpValChange(val: String, oldVal: String) {
    console.log("val :", val);
    console.log("oldVal :", oldVal);
  }

  // provid
  @Provide() providData = "pppp";
  @Provide() providData2 = "dddd";

  // lifecycle
  created() {
    console.log("=====created=====");
  }

  mounted() {
    // 全局属性 需要定义
    console.log("globalVal: ", this.$globalVal);
    console.log("=====mounted=====");
  }

  // methods
  onButtonClick() {
    console.log("click");
  }

  sonChange(val: any) {
    this.sonVal = val;
  }
  // active ref
  activeRef() {
    this.sonRef.refActFun();
  }

  // Hook
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log("beforeRouteEnter");
    next(); // needs to be called to confirm the navigation
  }
}
</script>

<style lang="scss" scoped></style>

```

> 子组件

```vue
<template>
  <div class="container">
    <div>SonComp</div>
    <div>inject {{ providData }}</div>
    <div>inject {{ pdata }}</div>
    <div>binding .sync : <input type="text" v-model="syncedName" /></div>
    <div>
      binding v-model : {{ modelData }}
      <button @click="$emit('onModelChange', modelData + '@')">
        change modelData
      </button>
    </div>
    <div><input type="text" @input="inpChange" /></div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Inject,
  PropSync,
  Model,
  Emit
} from "vue-property-decorator";
@Component({
  name: "SonComp"
})
export default class extends Vue {
  // propSync
  @PropSync("syncData", { type: String }) syncedName!: string;
  // model
  @Model("onModelChange", { type: String }) readonly modelData!: String;
  // inject
  @Inject("providData") readonly providData!: String;
  @Inject({ from: "providData2", default: "default provid data" })
  readonly pdata!: String;
  // emit
  @Emit("sonChange")
  inpChange(e: any) {
    console.log(e.target.value);
    return e.target.value;
  }
  // method
  refActFun() {
    console.log("REF active");
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 30px;
  padding: 30px;
  border: 1px solid #dddded;
}
</style>

```



### mixin

`mixin.ts`

```typescript
import Vue from "vue";
import Component from "vue-class-component";

export default class MyMixin extends Vue {
  mixinValue = "###mixinValue###";
}
```

`index.vue`

```
import MyMixin from "@/mixin/mixin.ts";
@Component({
  name: "Test",
})
export default class extends MyMixin {}
```



### Router Hooks

如要使用路由钩子 beforeRouteEnter 、beforeRouteLeave、beforeRouteUpdate需要在入口注册，否则将被认为是普通函数

`class-component-hooks.js`

```js
// class-component-hooks.js
import Component from "vue-class-component";

// Register the router hooks with their names
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate" // for vue-router 2.2+
]);

```

`main.ts`

```typescript
import './utils/class-component-hooks'
```



### 挂载在vue原型上的属性或方法

对于一些全局配置或封装的ajax方法，通常会挂载到vue的原型上，但在ts中必须提前声明再使用

src/types/vued.ts

```typescript
// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
// node_modules/vue/types/vue
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $globalVal: string
  }
}
```

main.ts

```typescript
Vue.prototype.$globalVal = "999"
```



## vuex 迁移

[vuex-module-decorators](https://npm.taobao.org/package/vuex-module-decorators)

[vuex-class](https://npm.taobao.org/package/vuex-class)

待添加...