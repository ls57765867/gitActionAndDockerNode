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

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

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
router.get('/test2', async (ctx) => {
    //查，数据库代码
    var sql = 'SELECT * FROM test';
    const data = await new Promise(resolve => {
        connection.query(sql, function (err, res) { //询问访问数据库，也就是去嫩那个数据库
            if (err) { //失败就报个错。
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            console.log("数据库查的结果：");
            console.log(res); //成功就输出下结果
            resolve(res)
        });
    })
    ctx.body = {
        code: 0,
        msg: data
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
    console.log('sbsb10')
    console.log('应用已经启动，http://localhost:3033');
})