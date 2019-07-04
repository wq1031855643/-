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
$(window).scroll(function() {
    if($(document).scrollTop()>=50){
        $('.xw_sideBar').css('position','fixed').css('top',0);
    }else{
        $('.xw_sideBar').css('top',50);
    }
  });
  
$(document).on("click",".xw_s-left li",function(){
    $(document).find('.xw_s-left li').children().removeAttr('style')
    if($(this).text()==""){
        $(document).fin('html,body').animate({scrollTop:0}, 'slow');
    }else{
        $(document).find('.xw_s-left li').removeClass('js-move');
        $(this).addClass('js-move');
        if($(this).text()=='感兴趣'){
            $(this).children().eq(0).css('background-position','21px -61px');
            $(document).find('.xw_s-right-top span').text('感兴趣的职位');
            $(document).find('.xw_s-right-bottom p').text('登录后查看感兴趣的职位');
            
        }else if($(this).text()=='沟通过'){
            $(this).children().eq(0).css('background-position','21px -124px');
            $(document).find('.xw_s-right-top span').text('沟通过的职位');
            $(document).find('.xw_s-right-bottom p').text('登录后查看沟通过的职位');
        }else if($(this).text()=='已投递'){
            $(this).children().eq(0).css('background-position','21px -146px');
            $(document).find('.xw_s-right-top span').text('投递过的职位');
            $(document).find('.xw_s-right-bottom p').text('登录后查看投递过的职位');
        }else if($(this).text()=='面试'){
            $(this).children().eq(0).css('background-position','21px -188px');
            $(document).find('.xw_s-right-top span').text('面试日程');
            $(document).find('.xw_s-right-bottom p').text('登录后查看面试日程');
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
    $('.xw_s-right').css('display','none');
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
