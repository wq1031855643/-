require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min', 'jquery-1.8.3.min'],
		'jqmsw': 'jquery.mousewheel',
	}
});

require(["hm", "jquery","jqmsw"], function(hm, $) {
	hm.creatHead();
	if ($("#l_body").length == 1) {
		$('<div class="nav-city"><p class="nav-city-box"><i class="icon-poi"></i><span class="nav-city-selected f_libcity">深圳</span><span class="switchover-city">[切换城市]</span></p></div>').insertAfter($("#xw_logo"));
	}
	hm.creatFooter();
	if ($("#side").length != 0) {
		hm.creatSide();
	}
	// console.log($('.xw_nav_left'))
	$('.xw_nav_left').on('click', 'a', function() {
		$('.xw_nav_left').children().children().removeClass('xw_js-left');
		$(this).addClass('xw_js-left');
		if ($(this).text() == 'APP' || $(this).text() == '资讯') {
			$('#xw_wrap').attr('class', 'xw_wrap-b');
			$('#xw_header').attr('class', 'xw_header-b');
			$('#xw_logo').attr('class', 'xw_logo-b');
			$('#xw_nav_left').addClass('xw_nav_left-b');
			$('#xw_enter').addClass('xw_enter-b');
			$('#xw_sign').addClass('xw_sign-b');
			$('#xw_nav_right').addClass('xw_nav_right-b');
		} else {
			$('#xw_wrap').attr('class', 'xw_wrap');
			$('#xw_header').attr('class', 'xw_header');
			$('#xw_logo').attr('class', 'xw_logo');
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
		if ($(document).scrollTop() >= 50) {
			$('.xw_sideBar').css('position', 'fixed').css('top', 0);
		} else {
			$('.xw_sideBar').css('top', 50);
		}
	});
	$('.xw_s-left li').click(function() {
		// alert(1)
		$('.xw_s-left li').children().removeAttr('style')
		if ($(this).text() == "") {
			$('html,body').animate({
				scrollTop: 0
			}, 'slow');
		} else {
			$('.xw_s-left li').removeClass('js-move');
			$(this).addClass('js-move');
			if ($(this).text() == '感兴趣') {
				$(this).children().eq(0).css('background-position', '21px -61px');
				$('.xw_s-right-top span').text('感兴趣的职位');
				$('.xw_s-right-bottom p').text('登录后查看感兴趣的职位');

			} else if ($(this).text() == '沟通过') {
				$(this).children().eq(0).css('background-position', '21px -124px');
				$('.xw_s-right-top span').text('沟通过的职位');
				$('.xw_s-right-bottom p').text('登录后查看沟通过的职位');
			} else if ($(this).text() == '已投递') {
				$(this).children().eq(0).css('background-position', '21px -146px');
				$('.xw_s-right-top span').text('投递过的职位');
				$('.xw_s-right-bottom p').text('登录后查看投递过的职位');
			} else if ($(this).text() == '面试') {
				$(this).children().eq(0).css('background-position', '21px -188px');
				$('.xw_s-right-top span').text('面试日程');
				$('.xw_s-right-bottom p').text('登录后查看面试日程');
			}
		}
	})

	$('.xw_code').hover(function() {
		$('.xw_wechat').css('display', 'block');

	}, function() {
		$('.xw_wechat').css('display', 'none');
	})
	$('.xw_app').hover(function() {
		$('.xw_app-b').css('display', 'block');

	}, function() {
		$('.xw_app-b').css('display', 'none');
	})
	$('.xw_s-left ul li').click(function(e) {
		$('.xw_s-right').css('display', 'block');
		e.stopPropagation();
	})
	
	$('.xw_s-left ol li').eq(1).click(function() {
		$('.xw_dim').css('display', 'block');
		$('.vcc').text(getYZM(6))
		// alert(1)
	})

	// 以上是侧边栏--------------------------------
	// 以下是问题反馈-------------------------------
	$('.xw_close').click(function() {
		$('.xw_dim').css('display', 'none')
	})
	$('.xw_f-bottom:last').click(function() {
		$('.xw_dim').css('display', 'none')
	})
	$('.vcc').text(getYZM(6)).click(function() {
		$('.vcc').text(getYZM(6))
	});
	// ( function(){
	//     if($('.xw_f-center-c input').text()==''){
	//         $('.xw_f-center-c p').text('请输入验证码').css()
	//     }

	// })()
	$('.xw_f-center-c input').blur(function() {
		// alert(1)
		if ($('.xw_f-center-c b').text() == $('.xw_f-center-c input').val()) {
			$('.xw_f-center-c p').text('验证通过');
		} else if ($('.xw_f-center-c input').val() == '') {
			$('.xw_f-center-c p').text('请输入验证码');
		} else {
			$('.xw_f-center-c p').text('输入错误，请重新输入');
		}
		$('.vcc').text(getYZM(6))
		// console.log($('.xw_f-center-c b').text())
		// console.log($('.xw_f-center-c input').val())
	})

	function getYZM(num) {
		var yzm = "";
		//43aGtT 随机从ASCII码表中来
		for (var i = 0; i < num; i++) {
			var code = getRand(48, 122);
			if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
				var ch = String.fromCharCode(code)
				yzm += ch;
			} else {
				i--;
			}
		}
		return yzm;
	}

	function getRand(min, max) {
		return parseInt(Math.random() * (max - min + 1) + min);
	}

	
	if($(".f_libcity").length == 0){
	        return false;
	}
	    var JONS = '';
	    //请求ajax函数
	        $.ajax({
	            url:"data/city.json",
	            type:'get',
	            dataType:'json',
	            success:function(json){
	                JONS = json.zpData.cityList;
	            }
	        })
	    //单击地区选择时，调用请求ajax函数，并获得相应数据
	        function forArr(JONS){
	            var str = "";
	            var code = localStorage.getItem("posiCityCode");
	            for(var i=0,len = JONS.length ; i < len ;i++){
	                if(JONS[i].code == code){
	                    str += '<li code ='+ code +' style= "background:#f1f3f6">'+ JONS[i].name +'</li>'
	                }else{
	                    str += '<li code ='+ JONS[i].code +'>'+ JONS[i].name +'</li>'
	                }
	                
	            }
	            $(".f_cityList ul").html(str);
	            return str;
	        }
	    //鼠标移动到省会时，调用请求ajax函数，并获得相应数据
	        function forArr2(JOSN,code){
	            var str = "";
	            for(var i=0,len = JOSN.length ; i < len ;i++){
	                if(code == JOSN[i].code){
	                    var str2 = "";
	                    var lenArr = JOSN[i].subLevelModelList;
	                    for(var j=0,len=lenArr.length;j<len;j++){
	                            str2 += '<li>'+ lenArr[j].name +'</li>'; 
	                    }
	                    str += '<li code ='+ JOSN[i].code +'>'+ str2 +'</li>'
	                }  
	            }
	            $(".f_cityOist ol").html(str);
	        }
	    
	    //单击地区选择，调用forArr函数
	        $(".f_libcity").on("click",function(){
	            if($(".f_cityList ul").length == 0){
	                var str1 = '<div class = "f_cityList"><ul></ul><div class="f_sor"><p></p></div></div><div class = "f_cityOist"><ol></ol><div class="f_sor"><p></p></div></div>';
	                $(this).parent().parent().append(str1);
	            };
	            if( $(".f_cityList").css("display") == "none"){
	                $(".f_cityList,.f_cityOist").show();
	                var top = $(this).parent().outerHeight();
	                $(".f_cityList,.f_cityOist").css("top",top);
	                $(".f_cityList,.f_cityOist").show();
	                forArr(JONS);
	                $(this).addClass("f_showCity bg");
	            }else{
	                $(".f_cityList,.f_cityOist").hide();
	                $(this).removeClass("f_showCity bg");
	            }
	            box();  
	        })
	function box(){
	        //移入地区选择，调用forArr2函数
	        $(".f_cityList ul").on("mouseover","li",function(){
	            var code = $(this).attr("code");
	            forArr2(JONS,code);
	        })
	
	        $(".f_cityList,.f_cityOist").mouseover(function(e){
	            if(e.target.nodeName == "LI"){
	                $(e.target).css("background","#f1f3f6").siblings().css("background","#fff");
	                if(this.className == "f_cityList"){
	                    var code = ($(e.target).attr("code")) ;
	                    localStorage.setItem("posiCityCode",code)
	                }
	            }
	            var sor = $(this).children().eq(1);
	            var lh = $(this).children().eq(0).height();
	            var sor_h = $(sor).height();
	            var ratio = lh / sor_h - 0.3;
	            if(lh > sor_h){
	                $(sor).css("display","block");
	                var p = $(sor).children()[0];
	                if(p.nodeName == "P"){
	                    $(p).css("height", sor_h / ratio);
	                }
	            }
	            if(this.className == "f_cityList"){
	                var o = $(".f_cityOist").children().eq(1).children()[0];
	                $(".f_cityOist").children().eq(0).css("top",0);
	                $(o).css("top",0);
	            }  
	        })
	
	        $(".f_cityList,.f_cityOist").mouseout(function(e){
	            $(this).children().eq(1).css("display","none");
	        
	        })
	
	    //地区单击事件
	
	        $(".f_cityList ul,.f_cityOist ol").click(function(e){
	            if(e.target.nodeName == "LI"){
	                var str = $(e.target).html();
	                $(".f_libcity").html(str);
	                $(".f_cityList,.f_cityOist").css("display","none");
	                $(".f_libcity").removeClass("f_showCity bg");
	            }
	        })
	
	
	        //地区滑轮滚动事件
	        $(".f_cityList ul,.f_cityOist ol").mousewheel(function(e,delta){
	            var sor = $(this ).siblings();
	            var sor_p = $(this ).siblings().children();
	            var uh = $(this).height();
	            var ph = $(sor_p).height();
	            var fh = $(sor).height();
	            var pf = fh - ph;
	            var un = uh - fh;
	            if(parseInt($(sor_p).css("top")) == 0 && delta > 0){
	                return false;
	            }
	            var lTop = parseFloat($(sor_p).css("top")) + -delta * un / pf;
	            lTop = Math.abs(lTop);
	            lTop = lTop < 1 ? 0 : lTop;
	            lTop = lTop > pf ? pf : lTop;
	            $(sor_p).css("top",lTop);
	            $(this).css("top",-lTop  * un / pf);  
	            return false;
	        })
	
	    }
});
