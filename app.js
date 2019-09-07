//pch_server/app.js node程序

//1:加载第三方模块
const express = require("express");//web服务器
const mysql = require("mysql");//mysql驱动模块
const cors = require("cors");//跨域模块
const session = require("express-session");//session模块

//2:配置数据库连接池:提高数据效率
var pool = mysql.createPool({
   host:"127.0.0.1",  //数据库地址
   user:"root",       //数据库用户名
   password:"",       //数据库密码
   port:3306,         //数据库端口
   database:"pch",     //数据库名称
   connectionLimit:15 //连接数量
});

var server = express();
//3:配置跨域模块
server.use(cors({
   //允许跨域访问程序地址列表
   origin:["http://127.0.0.1:8080","http://localhost:8080"],
   credentials:true //请求验证
}))

//4:配置session模块
server.use(session({
   secret:"128位字符串", //自定义字符串用于加密数据使用
   resave:true,  //每次请求更新数据
   saveUninitialized:true  //保存初始化数据
}))

//4.1配置项目静态目录
server.use(express.static("public"));
//http://127.0.0.1:3000/01.jpg

//启动监听3000
server.listen(3000);

//功能一:完成用户登录操作
server.get("/login",(req,res)=>{
  //1:参数:获取网页传递两个数据 uname upwd
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  //参数方式一:?uname=silvia&upwd=123456 查询字符串
  //参数方式二:/silvia/123456            参数
  //2:sql:查询sql语句
  //数据库 库名 表名 列名 小写字母
  var sql = "SELECT uid FROM pch_login";
  sql+=" WHERE uname = ? AND upwd=md5(?)";
  //3:json:{code:1,msg:"登录成功"}
  pool.query(sql,[uname,upwd],(err,result)=>{
     //执行sql语句回调函数
     if(err)throw err;
     //判断
     if(result.length==0){
        res.send({code:-1,msg:"用户名或密码有误"});
     }else{
        //登录成功
        //将登录成功数据保存在session中
        req.session.uid=result[0].uid;
        //console.log(result)
        //console.log(req.session);
        res.send({code:1,msg:"登录成功",uid:req.session.uid});    
     }
  })
});
//测试登录接口:
//(1)启动node app.js
//(2)http://127.0.0.1:3000/login?uname=silvia&upwd=123456


//功能二:分页查询食谱列表
  server.get("/CookbookList",(req,res)=>{
   //2.接收客户端两个参数  pno页码  pageSize 页大小
      var p=req.query.pno;
      var ps=req.query.pageSize;
   //3.设置参数默认值 pno:1  pageSize:4
      if(!p){p=1};
      if(!ps){ps=6};
   //4.创建变量 offset 计算数据库偏移量
      var offset=(p-1)*ps;
   //5.对pageSize转换成整型？为避免nodejs报错
      ps=parseInt(ps);
   //6.创建sql语句
      var sql="SELECT lid,cname,img_url,title FROM pch_cookbooks LIMIT ?,?";
   //7.通过连接池发送sql语句
      pool.query(sql,[offset,ps],(err,result)=>{
          if(err) throw err;
          res.send({code:1,msg:"查询成功！",data:result});
          //console.log(result)
      });
   //8.获取数据库返回的查询结果
   //9.将查询结果发送给客户端
   });
   //测试分页接口:
   //http://127.0.0.1:3000/CookbookList?pno=2

//功能三：指定食谱加入收藏夹(需要判断用户是否登录)
//get/addCollect
server.get("/addcollect",(req,res)=>{
   //参数：获取当前用户id
   // console.log(req)
   var uid=req.session.uid;
   var lid=req.query.lid;
   var cname=req.query.cname;
   var title=req.query.title;
   var img_url=req.query.img_url;
   // console.log(img_url);
   //如果当前用户没有登录
   if(!uid){
      //返回错误数据
      res.send({code:-1,msg:"请先登录"});
      return;
   }
   if(!lid){
      res.send({code:-1,msg:"未添加食谱"})
   } 
   //查询指定用户是否收藏过此食谱
   var sql="INSERT INTO pch_collect values(null,?,?,?,?,?)";
   pool.query(sql,[uid,lid,img_url,cname,title],(err,result)=>{
      if(err) throw err;
      // console.log(img_url);
      // console.log(uid);
      // console.log(lid);
      // console.log(cname);
      // console.log(title);
      if(result.affectedRows > 0){
         res.send({code:1,msg:"收藏成功"})
      }else{
         res.send({ code:-1, msg: "收藏失败" })
      }     
   })
})
//测试接口：
//先登录成功
//http://127.0.0.1:3000/login?uname=silvia&upwd=123456
//http://127.0.0.1:3000/addcollect?lid=2&cname=韭菜盒子&title=燕麦是最佳的减肥增肌选择

//功能四：查询当前登录收藏夹信息（先判断是否登录）
//请求方式get 请求地址 /collect
server.get("/collect",(req,res)=>{
   var uid=req.session.uid;
   //console.log(uid);
   if(!uid){
      res.send({code:-1,msg:"请登录"});
      return;
   }
   //创建sql查询收藏夹内容
   var sql="SELECT cid,lid,cname,title,cname,img_url FROM pch_collect WHERE uid=?";
   //获取返回结果并发送客户端
   pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      res.send({code:1,msg:"查询成功",data:result});
   })
})
//测试接口：
//先登录成功
//http://127.0.0.1:3000/login?uname=silvia&upwd=123456
//http://127.0.0.1:3000/collect

//功能五：删除收藏夹中一个食谱
server.get("/del",(req,res)=>{
   //参数购物车cid
   var cid=req.query.cid;
   //删除指定数据
   var sql="DELETE FROM pch_collect WHERE cid=?";
   pool.query(sql,[cid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"取消收藏"});
      }else{
         res.send({code:-1,msg:"取消失败"})
      }
   })
})
//http://127.0.0.1:3000/del?cid=10

//功能六：删除购物车中多个商品
server.get("/delM",(req,res)=>{
   //1.获取参数 ids=2,3
   var cids=req.query.cids;
   //console.log(cids);
   //2.sql
   var sql=`DELETE FROM pch_collect WHERE cid IN (${cids})`;
   //3.json
   pool.query(sql,(err,result)=>{
       if(err) throw err;//如果发现错误，抛出
       //如果影响行数大于0表示执行成功，否则失败
       if(result.affectedRows>0){
           res.send({code:1,msg:"取消成功"})
       }else{
           res.send({code:-1,msg:"取消失败"})
       }
   })
})    

//http://127.0.0.1:3000/delM?cids=12,13

//查询首页轮播
server.get("/",(req,res)=>{
   pool.query("SELECT * FROM pch_index_carousel",[],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
         res.send({code:1,msg:"查询成功"})
     }else{
         res.send({code:-1,msg:"查询失败"})
     }
     console.log(result);
   })
})
//http://127.0.0.1:3000/