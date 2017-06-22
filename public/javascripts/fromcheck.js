/**
 * Created by Administrator on 2017/4/2.
 */


//表单验证
$(function () {
    $('#logform').bootstrapValidator({
            message: "This value is not valid",
            feedbackIcons: {//定义了检验通过与未通过时采用的图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
           },
            fields:
                {
                    tel:{
                        message:"The tel is not valid",
                        validators:{
                            notEmpty:{
                              message:"手机号不能为空"
                            },
                            stringLength:{
                                min:11,
                                max:11,
                                message:"手机号必须为11位"
                            },
                            regexp:{
                                regexp:/^1[34578]\d{9}$/,
                                message:"手机号错误"
                            }
                            //手机号已经注册过未写
                        }
                    },
                    StuId:{
                        message:"The StuId is not valid",
                        validators:{
                                notEmpty:{
                                    message:"学号不能为空"
                                },
				stringLength:{
                                min:11,
                                max:11,
                                message:"学号必须为11位"
                           	 },
				regexp:{
					regexp:/\d{11}/,
					message:"学号不正确"
					}

                            /*    regexp:{
                                    regexp:/^(\w)+@(\w)+(.\w+)+$/,
                                    message:"邮箱不合法"
                                },*/
                        }
                    },
                    password1:{
                        message:"The value is not valid",
                        validators: {
                            notEmpty: {
                                message: "密码不能为空"
                            },
                            stringLength: {
                                min: 6,
                                max: 20,
                                message: "密码长度必须在6~20之间"
                            }
                        }
                    },
                    password2:{
                        message:"The value is not valid",
                        validators:{
                                    notEmpty:{
                                        message:"密码不能为空"
                                    },
                                    identical:{
                                        field:'password1',
                                        message:"两次密码输入不一致"
                                    }
                        }
                    }
                }
    });
        /*.on("data-bv-events-form-success",function (e) {
        e.preventDefault();
        $('#logupbtn').removeAttr("disabled");
        console.log("表单验证成功");
    });*/
});



