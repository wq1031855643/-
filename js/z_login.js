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
            }else{
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
            $(ele).find('.z_bg b').text('验证通过')
            $(ele).find('.z_boxMove i').addClass('icon-duigoutianchong-').removeClass('icon-shuangyoujiantou-')
            $(ele).find('.z_boxMove').css("left", "276px")
            $(ele).find('.z_boxMove').unbind('mousedown');
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
    var phoneFlage = false
    var $z_signing =$('.z_all_sign').find('.z_mainBox0')
    $z_signing.submit(function () {
        var reg = /1[1-8]\d{9}/;
        if ($z_signing.find('.z_inp_phone').val() == "") {
            $z_signing.find('.err_phone').html('请填写手机号').css('display', 'block')
        } else if (reg.test($z_signing.find('.z_inp_phone').val()) == false) {
            $z_signing.find('.err_phone').html('请填写正确的手机号').css('display', 'block')
        } else {
            $('.err_phone').css('display', 'none')
            phoneFlage = true;
            if (z_boxMoveFlag == false) {
                $z_signing.find('.boxFlage').css('display', 'block').html('请滑动完成验证')
            } else {
                $z_signing.find('.boxFlage').css('display', 'none')
            }
        }
        if (reg.test($z_signing.find('.z_inp_phone').val()) && z_boxMoveFlag) {
        } else {
            return false
        }
    })
    var $z_refing =$('.z_all_reg').find('.z_mainBox0')
    $z_refing.submit(function () {
        var reg = /1[1-8]\d{9}/;
        if ($z_refing.find('.z_inp_phone').val() == "") {
            $z_refing.find('.err_phone').html('请填写手机号').css('display', 'block')
        } else if (reg.test($z_refing.find('.z_inp_phone').val()) == false) {
            $z_refing.find('.err_phone').html('请填写正确的手机号').css('display', 'block')
        } else {
            $('.err_phone').css('display', 'none')
            phoneFlage = true;
            if (z_boxMoveFlag == false) {
                $z_refing.find('.boxFlage').css('display', 'block').html('请滑动完成验证')
            } else {
                $z_refing.find('.boxFlage').css('display', 'none')
            }
        }
        if (reg.test($z_refing.find('.z_inp_phone').val()) && z_boxMoveFlag) {
        } else {
            return false
        }
    })

    // $('.z_mainBox1').submit(function () {
    //     var reg = /1[1-8]\d{9}/;
    //     if ($('.z_mainBox1').find('.z_inp_phone').val() == "") {
    //         $('.z_mainBox1').find('.err_phone').html('请填写手机号').css('display', 'block')
    //     } else if (reg.test($('.z_mainBox1').find('.z_inp_phone').val()) == false) {
    //         $('.z_mainBox1').find('.err_phone').html('请填写正确的手机号').css('display', 'block')
    //     } else {
    //         $('.z_mainBox1').find('.err_phone').css('display', 'none')
    //         phoneFlage = true;
    //         if (z_boxMoveFlag == false) {
    //             $('.z_mainBox1').find('.boxFlage').css('display', 'block').html('请滑动完成验证')
    //         } else {
    //             $('.z_mainBox1').find('.boxFlage').css('display', 'none')
    //         }
    //     }
    //     if (reg.test($('.z_inp_phone').val()) && z_boxMoveFlag) {
    //     } else {
    //         return false
    //     }
    // })
    var $z_refing1 =$('.z_all_reg').find('.z_mainBox1')
    $z_refing1.submit(function () {
        var reg = /1[1-8]\d{9}/;
        if ($z_refing1.find('.z_inp_phone').val() == "") {
            $z_refing1.find('.err_phone').html('请填写手机号').css('display', 'block')
        } else if (reg.test($z_refing1.find('.z_inp_phone').val()) == false) {
            $z_refing1.find('.err_phone').html('请填写正确的手机号').css('display', 'block')
        } else {
            $('.err_phone').css('display', 'none')
            phoneFlage = true;
            if (z_boxMoveFlag == false) {
                $z_refing1.find('.boxFlage').css('display', 'block').html('请滑动完成验证')
            } else {
                $z_refing1.find('.boxFlage').css('display', 'none')
            }
        }
        if (reg.test($z_refing1.find('.z_inp_phone').val()) && z_boxMoveFlag) {
        } else {
            return false
        }
    })
    var $z_signing1 =$('.z_all_sign').find('.z_mainBox1')
    $z_signing1.submit(function () {
        var reg = /1[1-8]\d{9}/;
        if ($z_signing1.find('.z_inp_phone').val() == "") {
            $z_signing1.find('.err_phone').html('请填写手机号').css('display', 'block')
        } else if (reg.test($z_signing1.find('.z_inp_phone').val()) == false) {
            $z_signing1.find('.err_phone').html('请填写正确的手机号').css('display', 'block')
        } else {
            $('.err_phone').css('display', 'none')
            phoneFlage = true;
            if (z_boxMoveFlag == false) {
                $z_signing1.find('.boxFlage').css('display', 'block').html('请滑动完成验证')
            } else {
                $z_signing1.find('.boxFlage').css('display', 'none')
            }
        }
        if (reg.test($z_signing1.find('.z_inp_phone').val()) && z_boxMoveFlag) {
        } else {
            return false
        }
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
    var $status =localStorage.getItem('status')
    if($status == 'reg'){
        $('.z_all_reg').css('display', 'block')
        $('.z_all_sign').css('display', 'none')
    }else{
        $('.z_all_reg').css('display', 'none')
        $('.z_all_sign').css('display', 'block')
    }
    //登录注册之间的切换

    $('.z_all_sign').find('.z_link_sig').bind('click', function () {
        $('.z_all_sign').css('display', 'none');
        $('.z_all_reg').css('display', 'block')
    })
    $('.z_link_reg').bind('click', function () {
        $('.z_all_sign').css('display', 'block');
        $('.z_all_reg').css('display', 'none')
        var str=" <li><i class=\"z_icon\"></i><span>沟通</span><span>在线职位沟通</span></li><li><i class=\"z_icon\"></i\><span>任性选</span\><span>各大行业职业任你选</span\></li>"
        $('.z_login_left ul').html(str)
    })

    //注册 找工作和招聘之间的切换
    $('.z_purpose_row span').each(function(index,ele){
        $(ele).bind('click',function(){
            $(this).addClass('curr').siblings().removeClass('curr')
            $('.z_all_reg').find('.z_mainBox0').css('display','none')
            $('.z_all_reg').find('.z_mainBox1').css('display','none')
            $('.z_all_reg').find('.z_mainBox'+index).css('display','block')
            if(index!=1){
                var str =" <li><i class=\"z_icon\"></i><span>沟通</span><span>在线职位沟通</span></li><li><i class=\"z_icon\"></i\><span>任性选</span\><span>各大行业职业任你选</span\></li>"
                $('.z_login_left ul').html(str)
            }else{
                str ="<li><i class=\"icon\"></i><span>招聘效果好</span><span>与职场人在线开聊</span></li><li><i class=\"icon\"></i><span>更多在线牛人</span><span>入职速度快</span></li><li><i class=\"icon\"></i><span>人才匹配度高</span><span>获取更精准的牛人</span></li>"
                $('.z_login_left ul').html(str)
            }
        })
    })

    // 微信极速注册
    $('.sho').bind('click',function(){
        $('.z_all_reg').find('.z_main').css('display','none')
        $('.z_inner_box').css('display','block')
        $('.z_wrap_login').addClass('z_height')
    })

    $('.ph').bind('click',function(){
        $('.z_all_reg').find('.z_main').css('display','block')
        $('.z_inner_box').css('display','none')
        $('.z_wrap_login').removeClass('z_height')
    })

