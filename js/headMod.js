define(function () {
	function creatHead(){
		var head = document.querySelector("#header");
		var str = '<div id="xw_wrap" class="xw_wrap"><div id="xw_header" class="xw_header"><div id="xw_her_left" class="xw_her_left"><a id="xw_logo" class="xw_logo" href="#"></a><ul id="xw_nav_left" class="xw_nav_left"><li><a id="home" class="xw_js-left tra" href="/?type=home">首页</a></li><li><a id="posi" class="tra" href="posi?type=posi">职位</a></li><li><a id="com" class="tra" href="company?type=com">公司</a></li><li><a id="app" class="tra" href="app?type=app">APP</a></li><li><a id="zx" class="tra" href="message?type=zx">资讯</a></li></ul></div><div id="xw_her_right" class="xw_her_right"><a id="xw_enter" class="xw_enter tra" href="login?type=login">登陆</a><a id="xw_sign" class="xw_sign tra" href="login?type=add">注册</a><ul id="xw_nav_right" class="xw_nav_right"><li><a class="tra" href="login?type=add">我要招聘</a></li><li><a class="tra" href="resume">我要找工作<span class="xw_spa">hot</span></span></li><li><a class="tra" href="resume">上传简历</a></li></ul></div></div></div>';
		head.innerHTML += str;
	}
	
	function creatFooter(){
		var footer = document.querySelector("#footer");
		var str = '<div class="xw_footer"><div class="xw_siteinfo"><div class="xw_msg-left"><dl class="xw_friendlink"><dt>企业服务</dt><dd><a href="#">职位搜索</a></dd><dd><a href="#">新闻资讯</a></dd><dd><a href="#">BOSS直聘APP</a></dd></dl><dl class="xw_friendlink"><dt>使用与帮助</dt><dd><a href="#">用户协议与隐私政策</a></dd><dd><a href="#">防骗指南</a></dd><dd><a href="#">职位发布规则.</a></dd><dd><a href="#">使用帮助..</a></dd></dl> <dl class="xw_friendlink"><dt>联系BOOS直聘</dt><dd>北京华品博睿网络技术有限公司</dd><dd>公司地址 北京市朝阳区太阳宫中路8号冠捷大厦302</dd><dd>联系电话 010-84150633</dd><dd>违法和不良信息举报邮箱<a href="#">jubao@kanzhun.com</a></dd></dl><p class="xw_bossom"><span>Copyright © 2019 BOSS直聘</span><span>京ICP备14013441号-5</span><span>京ICP证150923号</span><a href="#" class="siteinfolegal"><img src="https://static.zhipin.com/v2/web/geek/images/icon-badge-1.png" alt="#"> 电子营业执照</a><a href="#" class="siteinfolegal">京公网安备11010502032801 <img src="https://static.zhipin.com/v2/web/geek/images/icon-beian.png" alt="#"> </a><a href="#">首都网警</a></p></div><div class="xw_msg-right"><div class="xw_r-top "><img src="https://static.zhipin.com/v2/web/geek/images/footer-logo.png" alt="#"><div style="clear: both"></div><p>企业服务热线和举报投诉 400 065 5799</p><p>工作日 8:00 - 22:00</p><p>休息日 9:30 - 18:30</p></div> <div class="xw_l-bottom "><a href="#"><i class="iconfont">&#xe6f2;</i></a><a class="two" href="#"><img class="xw_imgs" src="https://static.zhipin.com/v2/web/geek/images/we_chat_qr.jpg" alt=""><i class="iconfont">&#xe64a;</i></a><a href="#"><i class="iconfont">&#xe62f;</i></a></div></div></div></div>';
		footer.innerHTML += str;
	}
	
	function creatSide(){
		var side = document.querySelector("#side");
			var str = '<div class="xw_sideBar"><div class="xw_s-left"><ul><li class="js-move"><i class="xw_lii-a" style="background-position: 21px -61px;"></i>感兴趣</li><li><i class="xw_lii-b"></i>沟通过</li><li><i class="xw_lii-c"></i>已投递</li><li><i class="xw_lii-d"></i>面试</li></ul><ol><li class="xw_hover"><i class="xw_lii-e"></i></li><li>反馈</li><li class="xw_code">微信<div class="xw_wechat-app xw_wechat"><div></div><img src="https://static.zhipin.com/v2/web/geek/images/wechat-qrcode.jpg" alt="#">关注BOSS直聘微信服务号</div></li><li class="xw_app">APP<div class="xw_wechat-app xw_app-b"><div></div><img src="https://static.zhipin.com/v2/web/geek/images/wechat-qrcode.jpg" alt="#">下载BOSS直聘APP</div></li></ol></div><div class="xw_s-right"><p class="xw_s-right-top"><span>感兴趣的职位</span> <a href="#">查看全部</a></p><div class="xw_s-right-bottom"><p>登录后查看感兴趣的职位</p><a class="landing" href="#">去登录</a></div></div></div><div class="xw_dim"><div class="xw_feedback"><div class="xw_f-top"><h3>意见反馈 <span>（登录用户，提交反馈后可在App端查看客服回复的消息）</span> </h3></div><div class="xw_f-center"><div class="xw_f-center-a"><span>内容描述:</span><textarea name="content" id="content" placeholder="请简要描述你的问题和意见（必填）"></textarea><p>游客反馈，请在描述中留下联系电话</p></div><div class="xw_f-center-b"><p>问题截图：<span>最多3张，支持JPG，JPEG，PNG格式（选填）</span></p> <a href="javascript:;"><input type="file"></a> </div><div class="xw_f-center-c"><span>验证码：</span> <input type="text" placeholder="验证码"><b class="vcc">1111</b><p>请输入验证码</p></div></div><div class="xw_f-bottom"><a href="#">确定</a><a href="#">取消</a></div><div class="xw_close">x</div></div></div>';
			side.innerHTML += str;
		}
		
	return {
	    creatHead: creatHead,
		creatFooter: creatFooter,
		creatSide: creatSide
	}
})


