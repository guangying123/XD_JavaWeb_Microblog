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

router.get('/',function (req,res,next) {
   // console.log(req.query);
    //var userdata = {"loginname":loginname,"logincode":logincode,"flag":flag};
    //var result= { "username": '畅阳光', "StuId": '14030130040', "sex": '男', "addr": '海棠', "relation": '1242503370' };
    //result为从数据库中取出的用户的个人数据
    //var result= {  "StuId": '14030130010', "username": '李小梦',"sex": '', "addr": '海棠', "relation": '' };
    //console.log(result);
    var loginname = req.query.loginname;
    var logincode = req.query.logincode;
        var sqlStuId = 'select StuId,username,sex,addr,relation from customers where StuId = ?';
        var parStuId = [loginname];
        client.query(sqlStuId,parStuId,function (err,result)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                console.log(result);
                console.log(JSON.stringify(result[0]));
                res.end(JSON.stringify(result[0]));
            }
        });

});

module.exports=router;

