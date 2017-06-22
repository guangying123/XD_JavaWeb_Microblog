var express = require('express');
var mysql = require('mysql');
var client = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'happycourier',
    password:'123456'
});

var router = express.Router();
router.get('/',function (req,res,next) {
    //console.log(req.query);//loginname: '',logincode: '',tel: '13468971282',email: '1242503370@qq.com',password1: '123456',password2: '123456' }
    var tel = req.query.tel;
    var StuId = req.query.StuId;
    var password = req.query.password1;
    //console.log(tel+" "+StuId+" "+password);
    var sql = 'insert into Customers(StuId,code,tel,photo_path) values(?,?,?,"images/not found.jpg")';//注册过程未判断错误处理
    var sql2 = "insert into relaion values(?,?)";
    var parms2=[StuId,StuId];
    var params = [StuId ,password,tel];
    client.query(sql,params,function (err,result) {
        if(err)
        {
            console.log('err:'+err);
            res.end("false");
            return;
        }
        else
        {
           // console.log(result);
            client.query(sql2,parms2,function (err,result) {
                if(err)
                {
                    console.log(err);
                }
            })
            res.end("true");
        }
    });
    //
    /*存储用户的注册信息【手机号  邮箱 密码】;
    判断手机号是否已经注册过
    若满足条件 弹出注册成功   否则弹出手机号已被注册
    //*/
});
module.exports=router;