//1.加载模块  express pool 
const express = require('express')
const pool = require('./pool')

//2.创建express对象
var app = express();

//加载cors组件模块用于解决跨域问题  必须在服务器创建对象后执行
const cors = require("cors");
//配置允许脚手架(端口3001)允许访问node.js服务器程序(端口3000)
app.use(cors({
    origin: ["http://loaclhost:3005", "http://127.0.0.1:3005"],
    credentials: true
}))

//加载第三方模块session 并进行配置
//7.1加载express-session  允许保存登录
// const session = require("express-session");
// //7.2配置  让其允许跨域
// app.use(session({
//     secret:"128位随机字符",  //安全字符串
//     resave:false,           //请求保存
//     saveUninitialized:true,  //初始化保存
//     cookie:{                 //保存最大时间
//         maxAge:1000*60*60*24     
//     }

// }))

//3.指定监听端口3000
app.listen(3000);
//4.指定静态目录 publick  写绝对路径   __dirname 当前程序所属目录绝对路径
app.use(express.static(__dirname + '/public'))


//功能1：从数据库获取产品图片
app.get("/proimg",(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT img_url FROM watch_img WHERE id=? "
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})
//功能2：获取图片做成小图
app.get("/proimga",(req,res)=>{
    var img_id = req.query.img_id;
    var sql = "SELECT img_url FROM watch_img WHERE img_id=? "
    pool.query(sql,[img_id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})


