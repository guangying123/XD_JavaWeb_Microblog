/**
 * Created by Administrator on 2017/6/19.
 */
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
    var friendID = req.query.friendID;
    var xuehao = req.query.loginname;
    var flag = 1;
    console.log(friendID+" "+xuehao);
    var sql = "select  StuId,username,sex,addr,photo_path from customers where StuId = ?";
    var sql2 = "select * from relaion where xuehao = ? and xuehaoed = ?";
    client.query(sql,[friendID],function (err,result)
    {
        if(err)
        {
            console.log(err);
            res.end("false");
        }
        else
        {
            if(result.length == 0 )
            {
                console.log("noUser");
                res.end("noUser");
            }
            else
            {
                client.query(sql2,[xuehao,friendID],function (error,result1)
                {
                    if(error)
                    {
                        res.end("false");
                    }
                    else
                    {
                            flag = result1.length== 0 ? 0:1;//flag = 1 已经是好友了
                            result[0].flag = flag;
                            var tempresult = JSON.stringify(result[0]);
                            res.end(tempresult);
                    }
                })
            }
        }
    });
 });


router.get('/quguan',function (req,res,next)
{
    var loginname = req.query.loginname;
    var xuehao = req.query.xuehao;
    //console.log(xuehao+" "+loginname);
    var sql = "delete from relaion where xuehao = ? and xuehaoed = ?";
    client.query(sql,[loginname,xuehao],function (err,result)
    {
        console.log(result);
        if(err)
        {
            console.log(err);
            res.end("false");
        }
        else
        {
            res.end("true");
        }
    })
});

router.get('/guanzhu',function (req,res,next)
{
    var loginname = req.query.loginname;
    var xuehao = req.query.xuehao;
    var sql = "insert into relaion values(?,?)";
    client.query(sql,[loginname,xuehao],function (err,result)
    {
        if(err)
        {
            console.log(err);
            res.end("false");
        }
        res.end("true");
    })
});


router.get('/tuijian',function (req,res,next)
{
    var xuehao = req.query.xuehao;
    console.log("用户学号："+xuehao);
    var sqlMyFriend = "select xuehaoed from relaion where xuehao = ? and xuehaoed <> ?";
        client.query(sqlMyFriend,[xuehao,xuehao],function (err,result)
        {
            if(err)
            {
                console.log(err);
                res.end("false");
            }
            else
            {
                // console.log("用户的好友有：");
                // console.log(result);

                var friendSet = {};
                var len = result.length; //result为我的好友集
                for(var i =0;i<len;i++)
                {
                    var txuehao =  result[i]['xuehaoed'];
                    var sql2 = "select xuehaoed from relaion where xuehao ="+ txuehao+" and xuehaoed <> "+txuehao;
                    client.query(sql2,function (error,result1)
                    {
                        if(error)
                        {
                            console.log(error);
                            res.end("false");
                        }
                        else
                        {
                            //console.log("我第i个好友的好友集");
                           // console.log("他的学号是："+txuehao);
                            //console.log(result1);
                            var len1 = result1.length;//result1为我的某个好友的好友集
                            var ptflag = 1;
                            for(var j = 0;j<len1;j++)
                            {
                                //var sql2 = "select count(*) as num from relaion where xuehao = "+result1[j]['xuehaoed'] +" and xuehao not in (select xuehaoed from relaion where xuehao = "+xuehao+" and xuehaoed <> "+xuehao+")  and xuehaoed in  (select xuehaoed from relaion where xuehao = "+xuehao+" and xuehaoed <> "+xuehao+")";
                                // console.log("#######");
                                // console.log(result1[j]['xuehaoed']);
                                var check_result = result.concat([{"xuehaoed":xuehao}]);
                                for(var pt in check_result)
                                {
                                    // console.log("pt");
                                    // console.log(check_result[pt]["xuehaoed"]);

                                    if(check_result[pt]["xuehaoed"] == result1[j]['xuehaoed'])
                                    {
                                        // console.log("#######");
                                        // console.log(check_result[j]['xuehaoed']);
                                        ptflag = 0;
                                        break;
                                    }
                                }
                                if(ptflag == 0)
                                {
                                    ptflag = 1;
                                    continue;
                                }
                                !function (j) {
                                    var sql2 = "select count(*) as num from relaion where xuehao = "+result1[j]['xuehaoed'] +" and  xuehaoed in  (select xuehaoed from relaion where xuehao = "+xuehao+" and xuehaoed <> "+xuehao+")";
                                    client.query(sql2, function (error2, result2) {
                                        if (error2) {
                                            console.log("error2" + error2);
                                            res.end("false");
                                        }
                                        else
                                            {
                                                // console.log("我第i个好友的第j个好友和我有几个共同好友");
                                                // console.log("他的学号是：");
                                                // console.log(result1[j]["xuehaoed"]);
                                                // console.log(result2);

                                            friendSet[result1[j]['xuehaoed']] = result2[0]['num'];
                                        }
                                    })
                                }(j);
                            }
                        }
                    })
                }
                setTimeout(function ()
                {

                    //console.log("朋友集合");
                    //console.log(friendSet);
                    var tempaim =  sortby(friendSet);
                    var aim = [];
                    var tlen1 = tempaim.length;
                    var tlen =  tlen1< 20 ? tlen1:20;
                    for(var q = 0;q <tlen;q++)
                    {
                        var qsql = "select  StuId,username,sex,addr,photo_path from customers where StuId = "+Object.keys(tempaim[q])[0];
                        client.query(qsql,function (qerr,qresult)
                        {
                           if(qerr)
                           {
                               console.log(qerr)
                               res.end("false");
                           }
                           aim.push(qresult[0]);
                           // console.log(qresult[0]);
                        });
                    }
                    setTimeout(function ()
                    {
                        console.log("-----");
                        console.log(aim)
                        res.end(JSON.stringify(aim));
                    },300);

                },300);
            }
        });

        function  sortby(arr)
        {
            var tempFriend =[];
            for(var i in arr)
            {
                var tobj={};
                tobj[i] = arr[i];
                tempFriend.push(tobj);
            }
            tempFriend.sort(function (a,b) {
                return  b[Object.keys(b)[0]]-a[Object.keys(a)[0]] ;
            })
            console.log(tempFriend);
            return tempFriend;
        }
});


router.get('/friendList',function (req,res,next)
{
    var loginname = req.query.loginname;
    var sql = "select xuehaoed from relaion where xuehao = ?";
    client.query(sql,[loginname],function (err,result)
    {
        if(err)
        {
            console.log(err);
            res.end("false");
        }
        else
        {
            //console.log(result);
            res.end(JSON.stringify(result));
        }
    })
});

router.get('/fabu_pinglun',function (req,res,next)
{
    var flag = req.query.flag;
    var xuehao = req.query.xuehao;//留言人学号
    var pinglun = req.query.pinglun;
    console.log(xuehao)
    var sql = "select liuyan from Dongtai where flag = ?";
    client.query(sql,[flag],function (err,result)
    {
        if(err)
        {
            console.log(err);
            res.end("false");
        }
        else
        {
            var preliuyan = result[0]['liuyan']== null?"":result[0]['liuyan'];
            var newliuyan = preliuyan+"#"+xuehao+":"+pinglun;
            var sql1 ="update Dongtai set liuyan = ? where flag = ?";
            console.log(newliuyan);
            client.query(sql1,[newliuyan,flag],function (err1,result1)
            {
                if(err1)
                {
                    console.log(err1);
                    res.end("false");
                }
                else
                {
                    res.end();
                }
            })
        }
    })




});


 module.exports = router;