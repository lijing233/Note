# FP、TTI数据统计

## 名词解析

**FP** - (First Paint 首次绘制)

> FP is the time between navigation and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question "Is it happening?"

**TTI** - (First Interactive and Consistently Interactive 页面可交互的时间)



## 目的

为了更精确的分析页面性能以及页面加载情况，我们尝试使用Performance API统计FP和TTI时长以分析首页白屏和页面加载情况



## 使用

### 上报FP

*必须确保 `PerformanceObserver` 在任何样式表之前于文档的 `<head>` 中注册，以使其在 FP/FCP 发生前运行。*

在html的head中添加以下代码：

```html
<!-- Register the PerformanceObserver to track paint timing. -->
  <script>
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            const FP_TIME = Math.round(entry.startTime + entry.duration);
            console.log('FP_TIME :>> ', FP_TIME);
            window.shareitBridge.syncInvoke("Hybird", "handleStatsEvent", JSON.stringify({
              "eventId": "Page_In",
              "pve_cur": "ActiveName_FP", // 替换对应项目名称
              "extras": FP_TIME
            }))
          }
        }
      });
      observer.observe({entryTypes: ['paint']});
        
      // 监听longtask供tti-polyfill使用
      window.__tti = {e: []};
      window.__tti.o = new PerformanceObserver(function (l) {
        window.__tti.e =  window.__tti.e.concat(l.getEntries())
      })
      window.__tti.o.observe({
        entryTypes: ['longtask']
      })
    } catch (err) {
      console.log('Performance Regist Error :>> ', err);
    }
  </script>
```



### 上报TTI

添加TTI上报 (https://github.com/GoogleChromeLabs/tti-polyfill)

```shell
npm install tti-polyfill
```

main.js

```js
import ttiPolyfill from 'tti-polyfill';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  if (tti) {
    console.log('tti :>> ', tti);
    // 上报
    window.shareitBridge.syncInvoke("Hybird", "handleStatsEvent", JSON.stringify({
      "eventId": "Page_In",
      "pve_cur": "ActiveName_TTI", // 替换对应项目名称
      "extras": tti
    }))
  }
});
```





## 添加在线/离线标识

1. 安装cross-env

   ```shell
   npm i -D cross-env
   ```

2. package.json添加scripts

   ```json
   "build:insert": "cross-env PACKAGE_TYPE=insert vue-cli-service build",
   "build:offline": "cross-env PACKAGE_TYPE=offline vue-cli-service build",
   ```

3. vue.config.js

   ```js
   chainWebpack: (config) => {
     // PACKAGE_TYPE: online/offline/insert
     config.plugin("define").tap((args) => {
       const PackageType = process.env.PACKAGE_TYPE || 'online';
       // 客户端使用
       args[0]['process.env'].VUE_APP_PACKAGE_TYPE = JSON.stringify(PackageType);
       // html中使用
       args[0].VUE_APP_PACKAGE_TYPE = JSON.stringify(PackageType);
       return args;
     });
   }
   ```

4. 添加上报页面类型

   ```js
   // index.html
   window.shareitBridge.syncInvoke("Hybird", "handleStatsEvent", JSON.stringify({
     "eventId": "Page_In",
     "pve_cur": "ActiveName_FP", // 替换对应项目名称
     "extras": FP_TIME + '&' + PACKAGE_TYPE
   }))
   ```









light house tti 指标: https://web.dev/interactive/?utm_source=lighthouse&utm_medium=lr

tti标准: https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/preview#

以用户为中心的性能指标:

https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics?utm_source=devtools#user-centric_performance_metrics