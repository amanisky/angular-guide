# AngularGuide

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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
