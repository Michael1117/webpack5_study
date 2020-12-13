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

## 3.编译时间优化
- 减少要处理的文件
- 缩小查找的范围

### 3.1缩小查找范围

### 3.1.1 extensions

- 指定extensions 之后可以不用在require或是import的时候加文件扩展名
- 查找的时候依次尝试添加扩展名进行匹配

### 3.1.2 alias
- 配置别名可以加快webpack查找模块的速度
- 每当引入bootstrap模块的时候，它会引入bootstrap, 而不需要从node_modules文件夹中按模块的查找规则查找

```
npm i bootstrap css-loader style-loader -S
```

```
PS E:\code\webpack_5> npm run dev

> webpack_5@1.0.0 dev E:\code\webpack_5
> webpack --progress

10% building(node:13240) [DEP_WEBPACK_COMPILATION_NORMAL_MODULE_LOADER_HOOK] DeprecationWarning: Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader
99% done plugins webpack-cli[webpack-cli] Compilation finished
99% done plugins FriendlyErrorsWebpackPlugin

 DONE  Compiled successfully in 1519ms                                                                                                                                   10:17:10
99% done plugins webpack-bundle-analyzerWebpack Bundle Analyzer saved stats file to E:\code\webpack_5\dist\stats.json
99% done plugins smp

 SMP  ⏱
General output time took 1.6 secs

 SMP  ⏱  Plugins
BundleAnalyzerPlugin took 0.069 secs
FriendlyErrorsWebpackPlugin took 0.016 secs

 SMP  ⏱  Loaders
css-loader took 0.412 secs
  module count = 1
style-loader, and
css-loader took 0.257 secs
  module count = 1
modules with no loaders took 0.047 secs
  module count = 5



asset main.js 721 KiB [emitted] (name: main) 1 related asset
runtime modules 931 bytes 4 modules
cacheable modules 714 KiB
  modules by path ./node_modules/ 714 KiB
    modules by path ./node_modules/bootstrap/dist/css/*.css 704 KiB
      ./node_modules/bootstrap/dist/css/bootstrap.css 316 bytes [built] [code generated]
      ./node_modules/css-loader/dist/cjs.js!./node_modules/bootstrap/dist/css/bootstrap.css 703 KiB [built] [code generated]
    modules by path ./node_modules/css-loader/dist/runtime/*.js 3.78 KiB
      ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js 2.21 KiB [built] [code generated]
      ./node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
    ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
  modules by path ./src/*.js 108 bytes
    ./src/index.js 75 bytes [built] [code generated]
    ./src/title.js 33 bytes [built] [code generated]
webpack 5.10.0 compiled successfully in 1519 ms
```


### 3.1.3 modules
- 对于直接声明依赖名的模块webpack会使用类似 Node.js 一样进行路径搜索，搜索node_modules目录
- 如果可以确定项目内所有的第三方依赖模块都是在项目根目录下node_modules中的话可以直接指定
- 默认配置



### 3.1.4 mainFields
- 默认情况下 package.json 文件则按照文件中 main字段的文件名来查找文件


### 3.1.5 mainFiles
- 当目录下没有 package.json 文件时，  会默认使用目录下的index.js 这个文件

### 3.1.6 oneOf

- 每个文件对于rules中的所有规则都会遍历一遍，如果使用oneOf就可以解决该问题，主要能匹配一个即可退出
- 在oneOf中不能两个配置处理同一种类型文件


### dll废弃了

### 3.1.7 noParse

- module.noParse 字段， 可以用于配置哪些模块文件的内容不需要进行解析
- 不需要解析(即无依赖)的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
- 使用noParse进行忽略的模块文件中不能使用import、 require等语法

### 3.3 IgnorePlugin
- ignore-plugin用于忽略某些特定的模块，让webpack不把这些指定的模块打包进去
- requestRegExp 匹配 (test)资源请求路径的正则表达式
- contextRegExp (可选) 匹配(test) 资源上下文(目录)  的正则表达式
- moment会将所有本地化内容和核心功能一起打包，可以使用 IgnorePlugin 在打包时忽略本地化内容


### 3.4 thread-loader(多进程)
- 把thread-loader放置在其他loader之前，放置在这个loader之后的loader就会在一个单独的worker池(worker pool)中运行
- include 表示哪些目录中的.js 文件需要进行 babel-loader
- exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
- exclude 的优先级高于 include, 尽量避免exclude, 更倾向于使用 include