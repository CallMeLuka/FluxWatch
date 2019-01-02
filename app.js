//1.加载模块  express pool 
const express = require('express')
const pool = require('./pool')

//2.创建express对象
var app = express();

//加载cors组件模块用于解决跨域问题  必须在服务器创建对象后执行
const cors = require("cors");
//配置允许脚手架(端口3005)允许访问node.js服务器程序(端口3000)
app.use(cors({
    origin: ["http://loaclhost:3005", "http://127.0.0.1:3005"],
    credentials: true
}))



//加载第三方模块session 并进行配置
//7.1加载express-session  允许保存登录
const session = require("express-session");
// console.log(session)
//7.2配置  让其允许跨域
app.use(session({
    secret:"128位随机字符",  //安全字符串
    resave:false,           //请求保存
    saveUninitialized:true,  //初始化保存
    cookie:{                 //保存最大时间
        maxAge:1000*60*60*24     
    }
}))

//3.指定监听端口3000
app.listen(3000);
//4.指定静态目录 publick  写绝对路径   __dirname 当前程序所属目录绝对路径
app.use(express.static(__dirname + '/public'))


//功能1：从数据库获取产品图片
app.get("/proimg",(req,res)=>{
    var id = req.query.id;
    var img_id = req.query.img_id;
    var sql = "SELECT img_url FROM watch_img WHERE id=? AND img_id=? "
    pool.query(sql,[id,img_id],(err,result)=>{
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
//功能3：获取更多产品图片及内容
app.get("/getmore",(req,res)=>{
    var sql = "SELECT * FROM other_pro"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})

//功能4：获得产品价格名称及介绍
app.get("/getContainer",(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT pro_name,old_price,new_price,container FROM other_pro WHERE id=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})

//功能4：获得产品价格名称及介绍
app.get("/getContainer",(req,res)=>{
    var id = req.query.id;
    var sql = "SELECT pro_name,old_price,new_price,container FROM other_pro WHERE id=?"
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})

//功能5：用户登录
app.get("/login",(req,res)=>{
    //获取参数
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    // 创建正则
    // 创建sql
    var sql = "SELECT * FROM reg WHERE uname =? AND upwd = ?";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        // console.log(result)
        if(result.length>0){
            req.session.uname =uname;
            console.log(result)
            res.send({code:1,msg:"登录成功",data:result})
        }else if(result.length==0){
            res.send({code:-1,msg:"用户名或者密码错误"})
        }
    })
})

//功能6：用户注册
app.get("/reg",(req,res)=>{
    //获取参数
    var uname = req.query.uname;
    var uemail = req.query.uemail;
    var upwd = req.query.upwd;
    // 创建正则
    // 创建sql
    var sql = "INSERT INTO `reg`(`id`,`uname`,`uemail`,`upwd`) VALUES(null,?,?,?)";
    pool.query(sql,[uname,uemail,upwd],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:"用户注册成功"})
    })
})

//功能7：判断用户名重复
app.get("/pdreg",(req,res)=>{
    var uname = req.query.uname;
    var sql = "SELECT * FROM reg WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:"该用户已存在"})
        }else if(result.length ==0){
            res.send({code:1,msg:"该名称可用"})
        }
    })
})

//功能8：添加购物车
app.get("/addCart",(req,res)=>{
    //1:获取3个参数
    //需要第三方模块支持 bodyParser
    var usid = req.query.usid;
    var pid = req.query.pid;
    var pname = req.query.pname;
    var price = req.query.price;
    var count = req.query.count;
    var addtime = req.query.addtime;
    var aprice = count*price;
    //2:创建sql语句
    var sql  =" INSERT INTO `cart`(`id`, `usid`, `pid`, `pname`, `price`,`count`,`addtime`,`aprice`) VALUES (null,?,?,?,?,?,?,?)"
  
    pool.query(sql,[usid,pid,pname,price,count,addtime,aprice],(err,result)=>{
         if(err)throw err;
         res.send({code:1,msg:"购物车添加成功"});
    });
    //3:返回添加结果
  })

  //功能9：查询购物车
  app.get("/seCart",(req,res)=>{
      var usid = req.query.usid;
      var sql ="SELECT * FROM cart WHERE usid=?";
      pool.query(sql,[usid],(err,result)=>{
          if(err) throw err;
          if(result.length>0){
            res.send({code:1,data:result})
        }else if(result.length ==0){
            res.send({code:-1,msg:"购物车无商品"})
        }
      })
  })

    //功能10：删除购物车
    app.get("/deCart",(req,res)=>{
        var usid = req.query.usid;
        console.log(usid)
        var addtime = req.query.addtime;
        console.log()
        var sql ="DELETE FROM cart WHERE usid=? AND addtime=?";
        pool.query(sql,[usid,addtime],(err,result)=>{
            if(err) throw err;
            res.send({code:1,msg:"删除成功"})
        })
    })


