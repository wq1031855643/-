$(function(){
//屏幕缩小时， 位置固定
window.onresize = resize;
function resize() {
    var winW = $(window).width();
    if (winW < 1190) {
        $('.z_header').addClass('z_header2').removeClass('z_header')
        $('.z_wrap_login').addClass('z_wrap_login2').removeClass('z_wrap_login')
    }
    if (winW >= 1190) {
        $('.z_heaMove').addClass('z_header').removeClass('z_header2')
        $('.z_wrap_move').addClass('z_wrap_login').removeClass('z_wrap_login2')
    }
};
// 点击区号显示隐藏
$('.z_wrap_sele').bind('click', function () {
    if ($('.z_openLi ul')[0]) {
        tog2()
        return
    };
    $('.z_icon_sele').css({
        "background-position": '2px -86px',
    });
    $.ajax({
        type: 'get',
        url: 'data/code.json?_=' + new Date().getTime(),
        dataType: 'json',
        success: function (json) {
            var str = '';
            var $ul = $('<ul></ul>')
            $('.z_openLi').append($ul)
            for (var i = 0, ln = json.length; i < ln; i++) {
                str += '<li data-val=' + json[i].num + '><span class="num">' + json[i].num + '</span>' + json[i].county + '</li>'
            }
            $('.z_all_sign').find('.z_mainBox0').find('.z_openLi').find('ul').html(str)
            $('.z_all_sign').find('.z_mainBox1').find('.z_openLi').find('ul').html(str)
            $('.z_all_reg').find('.z_mainBox0').find('.z_openLi').find('ul').html(str)
            $('.z_all_reg').find('.z_mainBox1').find('.z_openLi').find('ul').html(str)

        }
    });
    $(document).bind('click', function () {
        $('.z_openLi ul').remove()
        tog2();
    });
    return false;
});
$('.z_phone').on("mouseover", "li", function () {
    $(this).css({ background: 'rgb(242,245,249)' }).siblings('li').css("background", "white")
},
);
$('.z_phone').on('click', 'li', function () {
    $('.z_openLi').children().remove()
    tog2()
    if ($('.z_all_sign').css('display') == 'block') {
        if ($('.z_mainBox0').css('display') == 'block') {
            $('.z_all_sign').find('.z_mainBox0').find('.z_select').html($(this).find('.num').html())
        }
    }
    if ($('.z_all_sign').css('display') == 'block') {
        if ($('.z_mainBox1').css('display') == 'block') {
            $('.z_all_sign').find('.z_mainBox1').find('.z_select').html($(this).find('.num').html())
        }
    }
    if ($('.z_all_reg').css('display') == 'block') {
        if ($('.z_all_reg').find('.z_mainBox0').css('display') == 'block') {
            $('.z_all_reg').find('.z_mainBox0').find('.z_select').html($(this).find('.num').html())
        } else {
            $('.z_all_reg').find('.z_mainBox1').find('.z_select').html($(this).find('.num').html())
        }
    }
});


function tog2() {
    $('.z_openLi ul').remove()
    $('.z_icon_sele').css({
        "background-position": '2px -54px',
    })
};
//滑块验证
var z_boxMoveFlag = false;
$('form').each(function (index, ele) {
    $(ele).find('.z_boxMove').bind('mousedown', function (e) {
        var x = e.clientX - parseInt($(this).css('left'))
        var $this = $(this)
        $(document).bind('mousemove', function (e) {
            var _x = e.clientX - x;
            var maxW = $this.parent().width() - $this.width() + 2
            if (_x > 0 && _x < maxW) {
                $this.css({
                    left: _x,
                })
            } else if (_x > maxW) {
                dragok0()
                z_boxMoveFlag = true;
            }
            return false
        })
        $(document).bind('mouseup', function () {
            if (parseInt($this.css("left")) < $this.parent().width() - $this.width() + 2) {
                $this.animate({
                    "left": 0
                }, 500, 'linear')
            }
            $(document).unbind('mousemove')
            $(document).unbind('mouseup')
            return false
        })
    });
    function dragok0() {
        var $Lef = $(ele).find('.z_bg').width()-$(ele).find('.z_boxMove').width()
        $(ele).find('.z_bg b').text('验证通过')
        $(ele).find('.z_boxMove i').addClass('icon-duigoutianchong-').removeClass('icon-shuangyoujiantou-')
        $(ele).find('.z_boxMove').css("left", $Lef)
        $(ele).find('.z_boxMove').unbind('mousedown');
        $(ele).find('.z_boxMove').addClass('z_btn_ok')
        $(document).unbind('mousemove');
        $(document).unbind('mouseup');
    }
})




//  手机号验证
$('.z_inp_phone').bind('focus', function () {
    $('.z_bor_phon').addClass('z_inp_focus')
    $('.z_book').addClass('z_book1')
})
$('.z_inp_phone').bind('blur', function () {
    $('.z_bor_phon').removeClass('z_inp_focus')
    $('.z_book').removeClass('z_book1')
})

//密码
$('.z_ipt_pass').bind('focus', function () {
    $('.z_bor_pass').addClass('z_inp_focus')
    $('.z_pass_i').addClass('z_pass_i1')
})
$('.z_ipt_pass').bind('blur', function () {
    $('.z_bor_pass').removeClass('z_inp_focus')
    $('.z_pass_i').removeClass('z_pass_i1')
})

$('.z_inp_mess').bind('focus', function () {
    $('.z_inp_me').addClass('z_inp_focus')
    $('.z_mess_i').addClass('z_mess_i1')
})
$('.z_inp_mess').bind('blur', function () {
    $('.z_inp_me').removeClass('z_inp_focus')
    $('.z_mess_i').removeClass('z_mess_i1')
})

if ($('.z_mainBox0').css('display') == 'none') {
    $('.z_mainBox1').find('.z_select').html($(this).find('.num').html())
} else {
    $('.z_mainBox0').find('.z_select').html($(this).find('.num').html())
}

// 登录方式切换 密码登录 --短信登录 --扫码登录

$('.z_sign_tab span').each(function (index, ele) {
    $(ele).bind('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur')
        $('.z_all_sign').find('.z_mainBox0').css('display', 'none')
        $('.z_all_sign').find('.z_mainBox1').css('display', 'none')
        $('.z_all_sign').find('.z_mainBox2').css('display', 'none')
        $('.z_all_sign').find('.z_mainBox' + index).css('display', 'block')

    })
})
// 提交
var reg = /1[1-8]\d{9}/;  //手机号初步验证
$('.z_wrapall').each(function (index, ele) {
    var $index =index
    $(ele).find('form').each(function (index, ele) {
        $(ele).find('.btn').bind('click',function(){
            if($(ele).find('.agree-policy').attr('checked')==false){
                alert('请同意协议')
            }
        if ($(ele).find('.z_inp_phone').val() == "") {
            $(ele).find('.err_phone').html('请填写手机号').css('display', 'block')
        } else if (reg.test($(ele).find('.z_inp_phone').val()) == false) {
            $(ele).find('.err_phone').html('请填写正确的手机号').css('display', 'block')
        } else {
            $(ele).find('.err_phone').css('display', 'none')
            if($(ele).find('.z_bg b').text()!='验证通过'){
                $(ele).find('.boxFlage').css('display', 'block').html('请滑动完成验证')
            }else{
                $(ele).find('.boxFlage').css('display', 'none')
                if($(ele).find('.z_ipt_pass').val()=="" || $(ele).find('.z_inp_mess').val()==""){
                    $(ele).find('.z_pass_er').html('请填写密码').css('display', 'block') 
                    $(ele).find('.z_err_msg').css('display', 'block') 
                }else{
                    $(ele).find('.z_pass_er').css('display', 'none')
                    $(ele).find('.z_err_msg').css('display', 'none')
                    if($(ele).find('.agree-policy').attr('checked')==false){
                        $(ele).find('.tip-error').html('协议需同意').hide()
                    }else{
                        $(ele).find('.tip-error').html('协议需同意').show()
                    }
                }
            }
        }
        if($index==1){
          
            if(reg.test($(ele).find('.z_inp_phone').val()) && $(ele).find('.z_bg b').text()=='验证通过' && $(ele).find('.z_inp_mess').val()!="" &&
            $(ele).find('.agree-policy').attr('checked')){
                $(ele).find('.tip-error').html('协议需同意').hide()
                $.ajax({
                    url:'http://localhost/project/php/login2.php',
                    type:'get',
                    cache:false,
                    dataType:'json',
                    data:{
                        act:'add',
                        user:$(ele).find('.z_inp_phone').val(),
                        pass:$(ele).find('.z_inp_mess').val(),  
                    },
                    success:function(json){
                        $('.z_tipCon').html(json.msg)
                        $('.z_Tips').show()
                    },
                    erroe:function(err){
                        $('.z_tipCon').html(err.err)
                        $('.z_Tips').show()
                    }
                })
            }
        }
        if(reg.test($(ele).find('.z_inp_phone').val()) && $(ele).find('.z_bg b').text()=='验证通过' && $(ele).find('.z_ipt_pass').val()!=""){
            $.ajax({
                url:'http://localhost/project/php/login2.php',
                type:'get',
                cache:false,
                dataType:'json',
                data:{
                    act:'login',
                    user:$(ele).find('.z_inp_phone').val(),
                    pass:$(ele).find('.z_ipt_pass').val(),  
                },
                success:function(json){
                    $('.z_tipCon').html(json.msg)
                    $('.z_Tips').show()
                },
                error:function(err){
                }
            })
        }   else{
            return false
        }
    })
    })
})


//发送验证码啊   大兄弟

$('.z_mess_btn').bind('click',function(){
    $('.z_wrapall').each(function (index, ele) {
        $(ele).find('form').each(function (index, ele) {
            if ($(ele).find('.z_inp_phone').val() == "") {
                $(ele).find('.err_phone').html('请填写手机号').css('display', 'block')
            } else if (reg.test($(ele).find('.z_inp_phone').val()) == false) {
                $(ele).find('.err_phone').html('请填写正确的手机号').css('display', 'block')
            } else {
                $(ele).find('.err_phone').css('display', 'none')
                if($(ele).find('.z_bg b').text()!='验证通过'){
                    $(ele).find('.boxFlage').css('display', 'block').html('请滑动完成验证')
                }else{
                    $(ele).find('.boxFlage').css('display', 'none')

                var time = 60;
                $('.z_mess_btn').addClass('z_send').html("已发送60s").attr('disabled',true)
                var timer =setInterval(function(){
                    time--;
                    $('.z_mess_btn').html("已发送"+time+"s")
                    if(time<=0){
                        $('.z_mess_btn').removeClass('z_send').html("发送验证码").attr('disabled',false)
                        clearInterval(timer)
                    }
                },1000)
            }
        }
        })
    })
})


// 提示框隐藏
$('.z_sure').bind('click',function(){
    $('.z_Tips').hide()
})
$(document).bind('click',function(){
    $('.z_Tips').hide()
})


//微信二维码#9fa3b0
$('.z_link_wechat').bind('mouseover', function () {
    $(this).css('color', '#5dd5c8')
})
$('.z_link_wechat').bind('mouseout', function () {
    $(this).css('color', '#9fa3b0')
})
$('.z_link_wechat').bind('click', function () {
    // $.alertable.alert('请使用微信扫码二维码登录');
    $('.weixinBox').css('display', 'block')
    return false
})
$(document).bind('click', function () {
    $('.weixinBox').css('display', 'none')
})



//扫码 鼠标移上 扫码帮助出现
$('.z_qrcode-box').bind('mouseenter', function () {
    $('.sign-scan-help').animate({
        opacity: 1,
    }, 300).css('display', 'block')
})
$('.z_qrcode-box').bind('mouseleave', function () {
    $('.sign-scan-help').animate({
        opacity: 0
    }, 300)
})

$('.scan-help-tab li').each(function (index, ele) {
    $(ele).bind('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.scan-help-content li').eq(index).addClass('active').siblings().removeClass('active')
    })
});

$('.z_all_reg').css('display', 'none')

//  根据登录状态 设置页面
var $status = localStorage.getItem('status')
if ($status == 'reg') {
    $('.z_all_reg').css('display', 'block')
    $('.z_all_sign').css('display', 'none')
} else {
    $('.z_all_reg').css('display', 'none')
    $('.z_all_sign').css('display', 'block')
}
//登录注册之间的切换
$('.z_all_sign').find('.z_link_sig').bind('click', function () {
    console.log(1)
    $('.z_all_sign').css('display', 'none');
    $('.z_all_reg').css('display', 'block')
})
$('.z_link_reg').bind('click', function () {
    $('.z_all_sign').css('display', 'block');
    $('.z_all_reg').css('display', 'none')
    var str = " <li><i class=\"z_icon\"></i><span>沟通</span><span>在线职位沟通</span></li><li><i class=\"z_icon\"></i\><span>任性选</span\><span>各大行业职业任你选</span\></li>"
    $('.z_login_left ul').html(str)
})

//注册 找工作和招聘之间的切换
$('.z_purpose_row span').each(function (index, ele) {
    $(ele).bind('click', function () {
        $(this).addClass('curr').siblings().removeClass('curr')
        $('.z_all_reg').find('.z_mainBox0').css('display', 'none')
        $('.z_all_reg').find('.z_mainBox1').css('display', 'none')
        $('.z_all_reg').find('.z_mainBox' + index).css('display', 'block')
        if (index != 1) {
            var str = " <li><i class=\"z_icon\"></i><span>沟通</span><span>在线职位沟通</span></li><li><i class=\"z_icon\"></i\><span>任性选</span\><span>各大行业职业任你选</span\></li>"
            $('.z_login_left ul').html(str)
        } else {
            str = "<li><i class=\"icon\"></i><span>招聘效果好</span><span>与职场人在线开聊</span></li><li><i class=\"icon\"></i><span>更多在线牛人</span><span>入职速度快</span></li><li><i class=\"icon\"></i><span>人才匹配度高</span><span>获取更精准的牛人</span></li>"
            $('.z_login_left ul').html(str)
        }
    })
})

// 微信极速注册
$('.sho').bind('click', function () {
    $('.z_all_reg').find('.z_main').css('display', 'none')
    $('.z_inner_box').css('display', 'block')
    $('.z_wrap_login').addClass('z_height')
})

$('.ph').bind('click', function () {
    $('.z_all_reg').find('.z_main').css('display', 'block')
    $('.z_inner_box').css('display', 'none')
    $('.z_wrap_login').removeClass('z_height')
})
//点击关闭登录注册
$('.z_close').bind('click',function(){
    $(this).parent().parent().parent().toggle()
})
})