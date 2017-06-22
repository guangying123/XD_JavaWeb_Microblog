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
  var mywords = req.query.mywords;
  var loginname = req.query.xuehao;
  var sql = 'insert into Dongtai(xuehao,dongtai,shijian) values(?,?,now())';
  client.query(sql,[loginname,mywords],function (err,result)
  {
    if(err)
    {
        console.log(err);
        res.end("false");
    }
      res.end();
  });
});

module.exports = router;