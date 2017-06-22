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
     console.log(req.query);
     var StuId = req.query.StuId;
     var username = req.query.username;
     var sex = req.query.sex;
     var addr = req.query.addr;
     var relation = req.query.relation;
     var sql = 'update customers set username = ?,sex = ?,addr=?,relation=? where StuId=?';
     var par = [username,sex,addr,relation,StuId];
     client.query(sql,par,function (err,result) {
        if(err)
        {
         console.log("err:"+err);
         res.end();
         return;
        }
     });
     res.end();
 })

module.exports = router;