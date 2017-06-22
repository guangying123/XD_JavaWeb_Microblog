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
    var redate = req.query.redate;
    var date = new Date();
    var curdate = redate == undefined ? date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate():redate;
    var sql = "select * from Dongtai where shijian = ? and xuehao in (select xuehaoed from Relaion where xuehao = ?)"
     client.query(sql,[curdate,loginname],function (err,result) {
         if(err)
         {
             console.log(err);
             res.end('false');
         }
         var tresult = JSON.stringify(result);
        //    console.log(tresult);
         res.end(tresult);
     })
 });
 module.exports = router;