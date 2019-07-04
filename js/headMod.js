define(function () {
	function creatHead(){
		var head = document.querySelector("#header");
		var str = '<div id="xw_wrap" class="xw_wrap"><div id="xw_header" class="xw_header"><div id="xw_her_left" class="xw_her_left"><a id="xw_logo" class="xw_logo" href="#"></a><ul id="xw_nav_left" class="xw_nav_left"><li><a class="xw_js-left tra" href="index.html">首页</a></li><li><a class="tra" href="#">职位</a></li><li><a class="tra" href="#">公司</a></li><li><a class="tra" href="#">APP</a></li><li><a class="tra" href="#">资讯</a></li></ul></div><div id="xw_her_right" class="xw_her_right"><a id="xw_enter" class="xw_enter tra" href="">登陆</a><a id="xw_sign" class="xw_sign tra" href="">注册</a><ul id="xw_nav_right" class="xw_nav_right"><li><a class="tra" href="#">我要招聘</a></li><li><a class="tra" href="#">我要找工作<span class="xw_spa">hot</span></span></li><li><a class="tra" href="#">上传简历</a></li></ul></div></div></div>';
		head.innerHTML += str;
	}

	function creatFooter(){
		var footer = document.querySelector("#footer");
		var str = '<div class="xw_footer"><div class="xw_siteinfo"><div class="xw_msg-left"><dl class="xw_friendlink"><dt>企业服务</dt><dd><a href="#">职位搜索</a></dd><dd><a href="#">新闻资讯</a></dd><dd><a href="#">BOSS直聘APP</a></dd></dl><dl class="xw_friendlink"><dt>使用与帮助</dt><dd><a href="#">用户协议与隐私政策</a></dd><dd><a href="#">防骗指南</a></dd><dd><a href="#">职位发布规则.</a></dd><dd><a href="#">使用帮助..</a></dd></dl> <dl class="xw_friendlink"><dt>联系BOOS直聘</dt><dd>北京华品博睿网络技术有限公司</dd><dd>公司地址 北京市朝阳区太阳宫中路8号冠捷大厦302</dd><dd>联系电话 010-84150633</dd><dd>违法和不良信息举报邮箱<a href="#">jubao@kanzhun.com</a></dd></dl><p class="xw_bossom"><span>Copyright © 2019 BOSS直聘</span><span>京ICP备14013441号-5</span><span>京ICP证150923号</span><a href="#" class="siteinfolegal"><img src="https://static.zhipin.com/v2/web/geek/images/icon-badge-1.png" alt="#"> 电子营业执照</a><a href="#" class="siteinfolegal">京公网安备11010502032801 <img src="https://static.zhipin.com/v2/web/geek/images/icon-beian.png" alt="#"> </a><a href="#">首都网警</a></p></div><div class="xw_msg-right"><div class="xw_r-top "><img src="https://static.zhipin.com/v2/web/geek/images/footer-logo.png" alt="#"><div style="clear: both"></div><p>企业服务热线和举报投诉 400 065 5799</p><p>工作日 8:00 - 22:00</p><p>休息日 9:30 - 18:30</p></div> <div class="xw_l-bottom "><a href="#"><i class="iconfont">&#xe6f2;</i></a><a class="two" href="#"><img class="xw_imgs" src="https://static.zhipin.com/v2/web/geek/images/we_chat_qr.jpg" alt=""><i class="iconfont">&#xe64a;</i></a><a href="#"><i class="iconfont">&#xe62f;</i></a></div></div></div></div>';
		footer.innerHTML += str;
	}
	return {
	    creatHead: creatHead,
		creatFooter: creatFooter
	}
})