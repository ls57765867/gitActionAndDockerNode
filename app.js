const Koa = require('koa'); // 引入koa
const Router = require('koa-router'); // 引入koa-router

const app = new Koa(); // 创建koa应用
const router = new Router(); // 创建路由，支持传递参数
const mysql = require('mysql');
const {body} = require("koa/lib/response");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'crouch11',
    database: 'test'
});

const result = connection.connect();

// 指定一个url匹配
router.get('/test', async (ctx) => {
    ctx.body = {
        data: 0,
        msg: 'test222'
    }
})
// 指定一个url匹配
router.get('/aaa', async (ctx) => {
    ctx.body = {
        data: 0,
        msg: 'aaaa'
    }
})

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.body = {
        data: 0,
        msg: result
    }
})


// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(router.routes());
app.use(router.allowedMethods({
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
}));

// 启动服务监听本地3000端口
app.listen(3000, () => {
    console.log('16')
    console.log('应用已经启动，http://localhost:3033');
})