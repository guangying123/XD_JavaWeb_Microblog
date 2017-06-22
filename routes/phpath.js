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
     var loginname = req.query.loginname;
         var sqlStuId = 'select photo_path,id from customers where StuId = ?';
         var parStuId = [loginname];
         client.query(sqlStuId,parStuId,function (err,result)
         {
             if(err)
             {
                 console.log('err:'+err);
                 res.end();
                 return;
             }
             res.send(JSON.stringify(result[0]));
         });
 });


 module.exports = router;