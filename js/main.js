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