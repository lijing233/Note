# Js的一些小坑

## 1.isNaN

当使用全局方法isNaN() 判断是否是NaN时，可能出现问题；对于传入的参数如果不能转为数值都会返回true;

使用Number.isNaN()判断NaN

```javascript
isNaN('s')
// true
Number.isNaN('s')
// false
```

