var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable=require('formidable');
var fs = require('fs');
var mysql = require('mysql');



var index = require('./routes/index');
var users = require('./routes/users');
var Homepage = require('./routes/Homepage');
var loginroute=require('./routes//loginroute');
var loginuproute = require('./routes/loginuproute');
var mycenter = require('./routes/mycenter');
var mycenterajax = require('./routes/mycenterajax');
var phpath = require('./routes/phpath');
var dongtai = require('./routes/dongtai');
var myword = require('./routes/myword');
var searchFriend = require('./routes/searchFriend');
var dealFriend = require('./routes/dealFriend');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//404到主页关系已解决  其他均为连接
app.use('/', index);//登陆界面
app.use('/users', users);
app.use('/Homepage',Homepage);//主界面







app.use('/loginroute',loginroute);//登陆模块登陆处理路由
app.use('/loginuproute',loginuproute);//注册模块表单信息收集
app.use('/mycenter',mycenter);//个人中心资料的回填
app.use('/mycenterajax',mycenterajax);//个人中心资料上传
app.use('/phpath',phpath);//加载我的头像
app.use('/dongtai',dongtai);
app.use('/myword',myword);
app.use('/searchFriend',searchFriend);
app.use('/dealFriend',dealFriend);


//图文动态处理路由
app.post('/myph_word',function (req,res) {//实现头像的上传
    var form = new formidable.IncomingForm();//创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + '/images/';//设置上传目录
    form.keepExtensions = true;//保留后缀
    var photopath;
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.send('<script>上传出错</script>');//错误渲染
            return;
        }
        // console.log(files.file['path']);
        // console.log(fields);
        var loginname = fields.loginname;
        var dongtai = fields.myph_wordtext;
        photopath = files.file['path'].slice(7);
        client = mysql.createConnection({
            host:'127.0.0.1',
            user:'root',
            database:'happycourier',
            password:'123456',
            useConnectionPooling: true
        });
        var sql="";
        var par=[];
        if(dongtai)
        {
            sql='insert into Dongtai(xuehao,dongtai,imageinfo,shijian) values(?,?,?,now())';
            par=[loginname,dongtai,photopath];
        }
        else
        {
            sql='insert into Dongtai(xuehao,imageinfo,shijian) values(?,?,now())';
            par=[loginname,photopath];
        }

        client.query(sql,par,function (err,result)
        {
            if(err)
            {
                console.log("err:"+err);
                res.end("false");
            }
            res.end();
        });
    });
})





app.post('/filedeal',function (req,res) {//实现头像的上传
    var form = new formidable.IncomingForm();//创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + '/images/';//设置上传目录
    form.keepExtensions = true;//保留后缀
    var photopath;
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.send('<script>上传出错</script>');//错误渲染
            return;
        }
       // console.log(files.file['path']);
       // console.log(fields);
        var loginname = fields.loginname;
        photopath = files.file['path'].slice(7);
        client = mysql.createConnection({
            host:'127.0.0.1',
            user:'root',
            database:'happycourier',
            password:'123456',
            useConnectionPooling: true
        });
            var insertStuIdsql = "update customers set photo_path = ? where StuId=?";
            var parStuId = [photopath,loginname];
            client.query(insertStuIdsql,parStuId,function (err,result)
            {
                if(err)
                {
                    console.log("err:"+err);
                    res.end();
                    return;
                }
                console.log("StuId"+result)
            });
        res.end(photopath);
    });
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
