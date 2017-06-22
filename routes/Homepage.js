var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
     var loginname = req.query.loginname;
     var logincode = req.query.logincode;
   // console.log("---------");
    //console.log(req.headers.cookie);
  //  console.log("---------");
     //console.log(flag);
    if(logincode==undefined||loginname==undefined)
    {
        res.redirect(302,"/");
    }
    else
    {
        res.render('Homepage',{myloginname:loginname,mylogincode:logincode});
    }
});

module.exports = router;
