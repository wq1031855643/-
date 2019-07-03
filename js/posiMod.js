if($('.f_login').length != 0){
    var str = '<h3>各大行业职业任你选</h3><form><div class="f_phone"><div class="f_select"><em>+86</em><ul><li data-val="+86"><span class="num">+86</span>中国大陆</li><li data-val="+1"><span class="num">+1</span>美国</li><li data-val="+852"><span class="num">+852</span>香港</li><li data-val="+81"><span class="num">+81</span>日本</li><li data-val="+886"><span class="num">+886</span>台湾</li><li data-val="+44"><span class="num">+44</span>英国</li><li data-val="+82"><span class="num">+82</span>韩国</li><li data-val="+33"><span class="num">+33</span>法国</li><li data-val="+7"><span class="num">+7</span>俄罗斯</li><li data-val="+39"><span class="num">+39</span>意大利</li><li data-val="+65"><span class="num">+65</span>新加坡</li><li data-val="+63"><span class="num">+63</span>菲律宾</li><li data-val="+60"><span class="num">+60</span>马来西亚</li><li data-val="+64"><span class="num">+64</span>新西兰</li><li data-val="+34"><span class="num">+34</span>西班牙</li><li data-val="+95"><span class="num">+95</span>缅甸</li><li data-val="+230"><span class="num">+230</span>毛里求斯</li><li data-val="+263"><span class="num">+263</span>津巴布韦</li><li data-val="+20"><span class="num">+20</span>埃及</li><li data-val="+92"><span class="num">+92</span>巴基斯坦</li><li data-val="+880"><span class="num">+880</span>孟加拉国</li></ul><input type="tel" placeholder="手机号"></div></div><div class="f_validation"><span class="f_slider iconfont"></span><em>请拖动滑块到最右边</em></div><div class="f_sms"><input type="text" placeholder="短信验证码"><span>发送验证码</span></div><div class="f_btn">登录/注册</div><div class="f_agreement"><input type="checkbox">我已同意用户协议及隐私政策</div></form>';
    $('.f_login').append(str);
    f_login();
}
function f_login(){
    // S phone 
    $(".f_phone .f_select").on("click","li,em",function(){
        if(this.nodeName == "EM"){
            $(this).addClass('f_emaction');
            $(this).siblings().eq(0).css("display","block");
        }
        if(this.nodeName == "LI"){
            var val = $(this).attr("data-val")
            $(this).parent().css("display","none");
            $(this).parent().siblings().eq(0).removeClass('f_emaction');
            $(this).parent().siblings().eq(0).html(val);
        }
        
    })
    $('.f_phone [type="tel"]').focus(function(){
        $('.f_phone').addClass("f_phoneAction");
    })
    $('.f_phone [type="tel"]').blur(function(){
        $('.f_phone').removeClass("f_phoneAction");
    })
    // E phone 

    // S f_validation 
    $(".f_slider").mousedown(function(){
        if(this.falg){
            $(this).stop(true);
            this.falg = false;
        }
        this.width = $(this).width();
        var _this = this;
        $(".f_validation").bind('mousemove',function(e){
            var e = e || event;
            var x = parseInt( e.pageX - $(this).offset().left );
            if(x > $(this).width() - _this.width){
                x = $(this).width()-_this.width;
                _this.falg = true;
            }
            $(_this).css("left",x)
            return false;
        })
        
        $(document).bind("mouseup",function(){
            $(".f_validation").unbind('mousemove');
            $(document).unbind('mouseup');
            if(!_this.falg){
                _this.falg = true;
                $(_this).animate({"left":0} , 500 , 'swing',function(){
                    _this.falg = false;
                });
            }else{
                $(_this).html('&#xe614');
                $(_this).css("background","#fff");
                $(_this).parent().addClass("f_validationAction");
                $(_this).siblings().html("");
                setTimeout(function(){
                    $(_this).parent().removeClass("f_validationAction");
                    $(_this).siblings().html("验证通过");
                },1500)
                
            }
            return false;
        })
    })
    // E f_validation 
    // S f_sms
    $(".f_sms input").focus(function(){
        $(this).parent().addClass("f_smsAction");
    })
    $(".f_sms input").blur(function(){
        $(this).parent().removeClass("f_smsAction");
    })
    // E f_sms
    // S f_btn
        $(".f_btn").click(function(){
            var phoneReg = /^1[3-9]\d{9}$/;
            var sliderFalg =  $(".f_validation").is("f_validationAction");
            var checkboxFalg = $(".f_agreement input").attr("checked")=='checked';
            var phoneFlag = phoneReg.test($('.f_phone input').val());
            if(sliderFalg && checkboxFalg && phoneFlag){
                return false;
            }else{
                return false;
            }
        })
}