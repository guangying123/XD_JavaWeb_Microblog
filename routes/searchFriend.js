var express = require('express');
var router = express.Router();


router.get('/',function (req,res,next)
{
    var loginname = req.query.loginname;
    res.render('searchFriend',{myloginname:loginname});
});

module.exports = router;