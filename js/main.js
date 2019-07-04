require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min', 'jquery-1.8.3.min']
	}
});
// 以下是头部
require(["hm", "jquery"], function(hm, $) {
	hm.creatHead();
	hm.creatFooter();
	hm.creatSide($('.asideRight'));
	// console.log($('.xw_nav_left'))
$('.xw_nav_left').on('click','a',function(){
    $('.xw_nav_left').children().children().removeClass('xw_js-left');
    $(this).addClass('xw_js-left');
    if($(this).text()=='APP'||$(this).text()=='资讯'){
        $('#xw_wrap').attr('class','xw_wrap-b');
        $('#xw_header').attr('class','xw_header-b');
        $('#xw_logo').attr('class','xw_logo-b');
        $('#xw_nav_left').addClass('xw_nav_left-b');
        $('#xw_enter').addClass('xw_enter-b');
        $('#xw_sign').addClass('xw_sign-b');
        $('#xw_nav_right').addClass('xw_nav_right-b');
    }else{
        $('#xw_wrap').attr('class','xw_wrap');
        $('#xw_header').attr('class','xw_header');
        $('#xw_logo').attr('class','xw_logo');
        $('#xw_nav_left').removeClass('xw_nav_left-b');
        $('#xw_enter').removeClass('xw_enter-b');
        $('#xw_sign').removeClass('xw_sign-b');
        $('#xw_nav_right').removeClass('xw_nav_right-b');

    }
})
// 以上是头部
// 以下是侧边栏
// $('.xw_sideBar')
$('.xw_s-left,.xw_s-right').height($(window).height());
$(window).scroll(function() {
    if($(document).scrollTop()>=50){
        $('.xw_sideBar').css('position','fixed').css('top',0);
    }else{
        $('.xw_sideBar').css('top',50);
    }
  });
$('.xw_s-left li').click(function(){
    // alert(1)
    $('.xw_s-left li').children().removeAttr('style')
    if($(this).text()==""){
        $('html,body').animate({scrollTop:0}, 'slow');
    }else{
        $('.xw_s-left li').removeClass('js-move');
        $(this).addClass('js-move');
        if($(this).text()=='感兴趣'){
            $(this).children().eq(0).css('background-position','21px -61px');
            $('.xw_s-right-top span').text('感兴趣的职位');
            $('.xw_s-right-bottom p').text('登录后查看感兴趣的职位');
            
        }else if($(this).text()=='沟通过'){
            $(this).children().eq(0).css('background-position','21px -124px');
            $('.xw_s-right-top span').text('沟通过的职位');
            $('.xw_s-right-bottom p').text('登录后查看沟通过的职位');
        }else if($(this).text()=='已投递'){
            $(this).children().eq(0).css('background-position','21px -146px');
            $('.xw_s-right-top span').text('投递过的职位');
            $('.xw_s-right-bottom p').text('登录后查看投递过的职位');
        }else if($(this).text()=='面试'){
            $(this).children().eq(0).css('background-position','21px -188px');
            $('.xw_s-right-top span').text('面试日程');
            $('.xw_s-right-bottom p').text('登录后查看面试日程');
        }
    }
})

$('.xw_code').hover(function(){
    $('.xw_wechat').css('display','block');

},function(){
    $('.xw_wechat').css('display','none');
})
$('.xw_app').hover(function(){
    $('.xw_app-b').css('display','block');

},function(){
    $('.xw_app-b').css('display','none');
})
$('.xw_s-left ul li').click(function(e){
    $('.xw_s-right').css('display','block');
    e.stopPropagation();
})
$(document).click(function(e){
    var e=e||event;
    if(e.clientX<$(window).width()-371){
        $('.xw_s-right').css('display','none');
    }
    
})
$('.xw_s-left ol li').eq(1).click(function(){
    $('.xw_dim').css('display','block');
    $('.vcc').text(getYZM(6))
    // alert(1)
})
// 以上是侧边栏--------------------------------
// 以下是问题反馈-------------------------------
$('.xw_close').click(function(){
    $('.xw_dim').css('display','none')
})
$('.xw_f-bottom:last').click(function(){
    $('.xw_dim').css('display','none')
})
$('.vcc').text(getYZM(6)).click(function(){
    $('.vcc').text(getYZM(6))
});
// ( function(){
//     if($('.xw_f-center-c input').text()==''){
//         $('.xw_f-center-c p').text('请输入验证码').css()
//     }
    
// })()
$('.xw_f-center-c input').blur(function(){
    // alert(1)
    if($('.xw_f-center-c b').text()==$('.xw_f-center-c input').val()){
        $('.xw_f-center-c p').text('验证通过');
    }else if($('.xw_f-center-c input').val()==''){
        $('.xw_f-center-c p').text('请输入验证码');
    } else{
        $('.xw_f-center-c p').text('输入错误，请重新输入');
    }
    $('.vcc').text(getYZM(6))
    // console.log($('.xw_f-center-c b').text())
    // console.log($('.xw_f-center-c input').val())
})
function getYZM(num){
	var yzm = "";
	//43aGtT 随机从ASCII码表中来
	for (var i = 0; i < num; i++) {
		var code = getRand(48,122);
		if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
			var ch = String.fromCharCode(code)
			yzm += ch;
		}else{
			i--;
		}
	}
	return yzm;
}
function getRand(min,max){
	return parseInt(Math.random()*(max-min+1) + min);
}

});
// 以上是问题反馈-------------------------------
// 以下是媒体合作-------------------------------

var emailReg = /^\w{3,20}@[0-9a-zA-Z]{2,6}(\.[a-zA-Z]{2,3}){1,2}$/; //这是邮箱验证
var phonelReg=/^1[3456789]\d{9}$/; //这是手机验证
var emailnf=false;
var phonenf=false;
var namenf=false;
var companynf=false;
var postnf=false;
$('.xw_submit').click(function(){
    if(emailnf==false&&phonenf==false&&namenf==false&&companynf==false&&postnf==false){
        return false;
    }
    $('.xw_media-wrap').hide()
})
$('.xw_shut').click(function(){
    $('.xw_media-wrap').hide()
})
$('.xw_media-off').click(function(){
    $('.xw_media-wrap').show()
})
$('#form').on('blur','p',function(){
    var ipt=$('#form p');
    for(var s=0;s<ipt.length;s++){
        if(s==$('#form p').index($(this)[0])){
            var aaa=$(this).children(":first").attr('placeholder')
            if(aaa=='请输入你的邮箱'){
                if($(this).children(":first").val()==''){
                    $(this).children(":last").css('display','block').html('请填写邮箱地址'+'<i></i>');
                    emailnf=false;
                }else if(emailReg.test($(this).children(":first").val())){
                    $(this).children(":last").css('display','none').html('请填写邮箱地址'+'<i></i>');
                    emailnf=true;
                }else{
                    $(this).children(":last").css('display','block').html('请正确填写邮箱地址'+'<i></i>');
                    emailnf=false;
               }
            }else if(aaa=='请输入你的手机号'){
                if($(this).children(":first").val()==''){
                    $(this).children(":last").css('display','block').html('请填写手机号'+'<i></i>');
                    phonenf=false;
                }else if(phonelReg.test($(this).children(":first").val())){
                    $(this).children(":last").css('display','none').html('请填写手机号'+'<i></i>');
                    phonenf=true;
                }else{
                    $(this).children(":last").css('display','block').html('请正确填写手机号'+'<i></i>');
                    phonenf=false;
                }
            }else if(aaa=='请输入你的姓名'){
                if($(this).children(":first").val()==''){
                    $(this).children(":last").css('display','block').html('请输入您的姓名'+'<i></i>');
                    namenf=false;
                }else{
                    $(this).children(":last").css('display','none').html('请输入您的姓名'+'<i></i>');
                    namenf=true;
                }
            }else if(aaa=='请输入你的公司名称'){
                console.log(4)
                if($(this).children(":first").val()==''){
                    $(this).children(":last").css('display','block').html('请输入您的公司名称'+'<i></i>');
                    companynf=false;
                }else{
                    $(this).children(":last").css('display','none').html('请输入您的公司名称'+'<i></i>');
                    companynf=true;
                }
            }else if(aaa=='请输入你的Title'){
                console.log(5)
                if($(this).children(":first").val()==''){
                    $(this).children(":last").css('display','block').html('请输入您的职位名称'+'<i></i>');
                    postnf=false;
                }else{
                    $(this).children(":last").css('display','none').html('请输入您的职位名称'+'<i></i>');
                    postnf=true;
                }
            }
        }

    }
    
})