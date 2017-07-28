
# favfor.me based on iView-project
http://favfor.me 是一个PC端收藏链接的工具,欢迎注册使用。
This project is build for Vue.js 2 + vue-router + webpack2 + iView 2, just install and run.

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
先配置package.json的dev命令中用于绑定webpack-dev-server的host和port
再配置webpack.dev.config中api的host，用于前后端分离模式中的请求转发。转发的rewrite规则可以根据需要自己编写。在本例的规则中，前端发出的"/api/account/login"请求将被转发到api服务上的"host:port/account/login"接口。
// For the first time, run init to create index.html
npm run init
npm run dev
```
### Production(Build)
```bush
npm run build
```

