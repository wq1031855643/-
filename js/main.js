require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod'
	}
});

require(["hm"], function(hm) {
	hm.creatHead();
	hm.creatFooter();
});







//吸顶效果函数
function fixedTop(dom,height){
	//获取浏览器滚走的距离 
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	//与168比较
	if(sTop > height){
		//当浏览器滚动到168的距离时让导航nav固定定位，top为0
		dom.style.position = "fixed";
		dom.style.top = 0;
		dom.style.backgroundColor = "#fff";
		dom.style.width = "100%";
	}else{
		//否则 定位回到初始状态
		dom.style.position = "static";
		dom.style.backgroundColor = "#f6f6f8";
	}
}

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