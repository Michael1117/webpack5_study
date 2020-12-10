friendly-errors-webpack-plugin可以识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验

## 速度分析

https://www.npmjs.com/package/speed-measure-webpack5-plugin
speed-measure-webpack5-plugin

```
npm i speed-measure-webpack5-plugin
```
```
 DONE  Compiled successfully in 666ms                                                                                                                                     9:29:34

 SMP  ⏱
General output time took 0.679 secs

 SMP  ⏱  Plugins
FriendlyErrorsWebpackPlugin took 0.017 secs

 SMP  ⏱  Loaders
modules with no loaders took 0.297 secs
  module count = 29
```

### 文件体积监控
webpack-bundle-analyzer是一个webpack插件，需要配合webpack和webpack-cli一起使用。这个插件的功能是生成代码分析报告，帮助提升代码质量和网站性能

可以直观分析打包出文件包含哪些，大小占比如何，模块包含关系，依赖项，文件是否重复，压缩后大小如何，针对这些，我们可以进行文件分割等操作。