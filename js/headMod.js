define(function () {
	// console.log("读取到了头部模块");
	function creatHead(){
		var head = document.getElementsByClassName("l_top")[0];
		var str = '<div id="xw_wrap" class="xw_wrap"><div id="xw_header" class="xw_header"><div id="xw_her_left" class="xw_her_left"><a id="xw_logo" class="xw_logo" href="#"></a><ul id="xw_nav_left" class="xw_nav_left"><li><a class="xw_js-left tra" href="#">首页</a></li><li><a class="tra" href="#">职位</a></li><li><a class="tra" href="#">公司</a></li><li><a class="tra" href="#">APP</a></li><li><a class="tra" href="#">资讯</a></li></ul></div><div id="xw_her_right" class="xw_her_right"><a id="xw_enter" class="xw_enter tra" href="">登陆</a><a id="xw_sign" class="xw_sign tra" href="">注册</a><ul id="xw_nav_right" class="xw_nav_right"><li><a class="tra" href="#">我要招聘</a></li><li><a class="tra" href="#">我要找工作<span class="xw_spa">hot</span></span></li><li><a class="tra" href="#">上传简历</a></li></ul></div></div></div>';
		head.innerHTML += str;
	}
	return {
	    creatHead: creatHead
	}
})