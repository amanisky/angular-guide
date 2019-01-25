# Angular 命令行

### 创建一个应用程序
+ ng new [name]
+ ng new guide

### 启动应用程序
+ ng serve -o

### 创建组件
+ ng g c [name]
+ ng g c components/heros

### 创建类
+ ng g cl [name]
+ ng g cl models/hero

### 创建服务
+ ng g s [name]
+ ng g s services/hero

### 创建模块
+ ng g m [name]
+ ng g m app-routing --flat -m=app
  + --flat 把这个文件放进 src/app 中，而不是单独的目录中
  + -m=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中
