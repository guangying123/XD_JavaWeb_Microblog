var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var client = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'happycourier',
    password:'123456',
    useConnectionPooling: true
});


 router.get('/',function (req,res,next)
 {
     var jsonStuIdtrue = JSON.stringify('{"flag":"StuId"}');
     var jsonfalse = JSON.stringify('{"flag":"false"}')
     var loginname = req.query.loginname;//手机号||学号
     var logincode = req.query.logincode;
   // console.log(loginname+" "+logincode);
    var sql1='select * from customers where StuId=? and code=?';//学号验证
    var StuIdpar = [loginname,logincode];
    client.query(sql1,StuIdpar,function (err,result)
    {
        if(err)
        {
            console.log("err:"+err);
            res.end(jsonfalse);
        }
        else
        {
            if(result.length)
            {
            res.end(jsonStuIdtrue);
            }
            else
            {
                res.end(jsonfalse);
            }
         }
    });
});

 module.exports=router;