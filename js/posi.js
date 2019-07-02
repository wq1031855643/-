
define(['jquery','jqmsw'],function () {
	
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
    $(".f_sel span").click(function(){
        if( $(".f_cityList").css("display") == "none"){
            $(".f_cityList,.f_cityOist").show();
            forArr(JONS);
            $(this).addClass("f_showCity bg");
        }else{
            $(".f_cityList,.f_cityOist").hide();
            $(this).removeClass("f_showCity bg");
        }  
    })

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
            $(".f_sel span").html(str);
            $(".f_cityList,.f_cityOist").css("display","none");
            $(".f_sel span").removeClass("f_showCity bg");
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


    //模拟滚动条
    $(".f_sor p").mousedown("click",function(e){
        this.y = e.offsetY;
        var paren = $(this).parent();
        var fh =$(paren).siblings().height() / $(paren).height();
        this.height =  $(paren).height() - $(this).height();
        _this = this;
        $(paren).parent().bind("mousemove",function(e){
            var y = e.pageY - $(this).offset().top    
            var lTop = y - _this.y;
            lTop = lTop < 1 ? 0 : lTop;
            lTop = lTop > _this.height ? _this.height : lTop;
            lTop = Math.abs(lTop);
            $(_this).css("top",lTop);
            console.log(_this.height,fh)
            $(paren).siblings().css("top",-lTop * fh);
            return false;
        })
        $(document).mouseup(function(){
            $(paren).parent().unbind("mousemove");
            return false;
        })
    })




    //职位ajax请求
    var POSI = '';
        $.ajax({
            url:"data/position.json",
            type:'get',
            dataType:'json',
            success:function(json){
                POSI = json.zpData;
            }
        })
    //单击职位调用的函数
    function posiArr(POSI){
        var code = localStorage.getItem("posiTypeCode");
        var str = "";
        for(var i=0,len = POSI.length ; i < len ;i++){
            if(POSI[i].code == code){
                str += '<li code ='+ code +' style= "background:#f1f3f6">'+ POSI[i].name +'</li>'
            }else{
                str += '<li code ='+ POSI[i].code +'>'+ POSI[i].name +'</li>'
            }  
        }
        $(".f_posiList .f_posi_ul1").html(str);
    }
    //职位单击事件
    $(".f_positype").click(function(){
        if( $(".f_posiList").css("display") == "none"){
            $(this).addClass("bg");
            posiArr(POSI);
            $(".f_posiList").css("display","block");
            $(".f_posi_ul1").parent().css("display","block");
        }else{
            $(this).removeClass("bg");
            $(".f_posiList").css("display","none");
        }
    })

    //职位移动事件函数
    function mobile1(code,POSI){
        for(var i=0,len = POSI.length ; i < len ;i++){
            if(code == POSI[i].code){
                var str2 = "";
                var lenArr = POSI[i].subLevelModelList;
                for(var j=0,len=lenArr.length;j<len;j++){
                    str2 += '<li code = '+ lenArr[j].code +'>'+ lenArr[j].name +'</li>'; 
                }
                $(".f_posiList .f_posi_ul2").html(str2);
            }  
        }  
    }
    //职位移动事件
    $(".f_posiList .f_posi_ul1").on("mousemove","li",function(e){
        var code = $(e.target).attr("code");
        mobile1(code,POSI);
    })
    //职位移动事件函数2
    function mobile2(code,POSI){
        var str = "";
        for(var i=0,len = POSI.length ; i < len ;i++){
            var josnJrr = POSI[i].subLevelModelList;
            for(var j=0,jen=josnJrr.length;j,j < jen; j++){
                if(code == josnJrr[j].code){
                    var str = '';
                    var u3Arr = josnJrr[j].subLevelModelList;
                    for(var z=0,len=u3Arr.length;z<len;z++){
                            str += '<li>'+ u3Arr[z].name +'</li>'; 
                    }
                    $(".f_posiList .f_posi_ul3").html(str);
                }  
            }
        }   
    }
    //职位移动事件2
    $(".f_posiList .f_posi_ul2").on("mousemove","li",function(e){
        var code = $(e.target).attr("code");
        mobile2(code,POSI);
    })

    

    $(".f_posiList").on("mouseover","li",function(){
        $(this).css("background","#f1f3f6").siblings().css("background","#fff");
        if($(this).parent().attr("class") == "f_posi_ul1"){
            var code = ($(this).attr("code")) ;
            localStorage.setItem("posiTypeCode",code)
        }
    })
    

    $(".f_posi_ul1,.f_posi_ul2,.f_posi_ul3,.f_posi_d2").mouseover(function(){
        $(".f_posiList div").css("display","block");
        var parent = $(this);//保证parent为div
        if(this.className != "f_posi_d2"){
            parent = $(this).parent();//保证parent为div
            var sor = $(this).siblings().eq(0);
            var lh = $(this).height();
            var sor_h = $(sor).height();
            var ratio = lh / sor_h - 0.3;
            if(lh > sor_h){
                $(sor).css("display","block");
                var p = $(sor).children()[0];
                if(p.nodeName == "P"){
                    $(p).css("height", sor_h / ratio);
                    $(p).css("display","block")
                }
            }else{
                $(sor).children().css("display","none");
            }
        }
        var chi = $(parent).siblings().children()
        for(var i = 0,len = chi.length; i < len; i++){
            if($(chi[i])[0].nodeName == "DIV"){
                $(chi[i]).css("display","none");
            }
            if(this.className == "f_posi_ul2" || this.className == "f_posi_d2" ){
                $(chi[2]).siblings().css("top",0);
                $(chi[2]).children().eq(0).css("top",0);
            }
            if(this.className == "f_posi_ul1"){
                $(chi[i]).children().eq(0).css("top",0);
                $(chi[i]).siblings().css("top",0);
                $(".f_posiList").children().eq(2).css("display","none");
            }
        }
    })
    $(".f_posi_ul1,.f_posi_ul2,.f_posi_ul3").mousewheel(function(e,delta){
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

    $(".f_posi_sor p").mousedown("click",function(e){
        this.y = e.offsetY;
        var paren = $(this).parent();
        var fh =$(paren).siblings().height() / $(paren).height() + 0.2;
        this.height =  $(paren).height() - $(this).height();
        _this = this;
        if( $(paren).siblings().height() > $(paren).height()){
            $(paren).parent().bind("mousemove",function(e){
                var y = e.pageY - $(this).offset().top    
                var lTop = y - _this.y;
                lTop = lTop < 1 ? 0 : lTop;
                lTop = lTop > _this.height ? _this.height : lTop;
                lTop = Math.abs(lTop);
                $(_this).css("top",lTop);
                $(paren).siblings().css("top",-lTop * fh);
                return false;
            })
            $(document).mouseup(function(){
                $(paren).parent().unbind("mousemove");
                return false;
            })
        }
        
    })
    $(".f_posi_ul3").click(function(e){
        if(e.target.nodeName == "LI"){
           $(".f_positype b").html( $(e.target).html() );
           $(".f_posiList").css("display","none");
           $(".f_positype").removeClass("bg");
        }

    })

// E positype


// S f_company_ul
    //保存公司行业信息
    var COM = '';
    $.ajax({
        url:"data/oldindustry.json",
        type:'get',
        dataType:'json',
        success:function(json){
            COM = json.zpData; 
        }
    })
    //定义单击公司行业调用函数
    function company(){
        var code = localStorage.getItem("companyCode");
        var str = "<li>不限</li>";
        for(var i=0,len = COM.length ; i < len ;i++){
            if(code == COM[i].code){
                str += '<li code ='+ code +' style="color:#00d7c6">'+ COM[i].name +'</li>' 
            }else{
                str += '<li code ='+ COM[i].code +'>'+ COM[i].name +'</li>'
            }
                
        }
        $(".f_company_ul").html(str);
    }
    //定义单击公司行业事件
    $(".f_company").click(function(){
        if( $(".f_company_ul").css("display") == "none"){
            $(this).addClass("bg");
            company(COM);
            $(".f_company_ul").css("display","block");
        }else{
            $(this).removeClass("bg");
            $(".f_company_ul").css("display","none");
        }
    })

    $(".f_company_ul").on("click","li",function(e){
        var code = $(e.target).attr("code");
        localStorage.setItem("companyCode",code);
        $(e.target).css("color","#00d7c6");
        $(".f_company b").html($(e.target).html());
        $(".f_company_ul").css("display","none");
        $(".f_company").removeClass("bg");

    })




// E f_company_ul
 
// S f_screening
    $(".f_screening").on("mouseover",'span',function(){
        $(this).siblings().addClass("f_action");
        $(this).parent().siblings().children('div').removeClass('f_action');
    })
    $(".f_screening").on("click",'li,em',function(){
        if(this.nodeName == "LI"){
            var str = "<em></em>" + $(this).html();
            $(this).parent().parent().removeClass("f_action");
            $(this).parent().parent().siblings().html(str);
            $(this).parent().parent().siblings().addClass("f_spanColor");
        }
        if(this.nodeName == "EM"){
            window.location.reload();
        }
    })
    $(".f_screening .f_scr_div div").mouseover(function(e){
        if(e.target.nodeName == "DIV"){
            $(this).removeClass("f_action");
        }
        
    })

// E f_screening


// S f_main_left
    $.ajax({
        url:"data/jobDescription.json",
        type:'get',
        dataType:'json',
        success:function(jsonArr){
            var str = '';
            for(var i = 0,len = jsonArr.length; i < len; i++){
                str += '<li><div class="f_primary"><h3>'+ jsonArr[i].jobName+'<span>'+ jsonArr[i].pay+'</span></h3><p>'+ jsonArr[i].address +'<em></em>'+ jsonArr[i].year+'<em></em>'+jsonArr[i].education+'</p></div><div class="f_company_nama"><h3>'+jsonArr[i].companyName+'</h3><p>'+jsonArr[i].tmt+'<em></em>'+jsonArr[i].financing+'<em></em>'+jsonArr[i].peopleNum+'</p></div><div class="f_contact"><h3><img src="'+jsonArr[i].img +'">'+jsonArr[i].recruiter+'<em></em>'+jsonArr[i].type+'</h3></div><a>立即沟通</a></li>'
            }
            $('.f_main_left').html(str);
            
        }
    })

    $(".f_main_left").on("mouseover","li",function(){
        $(this).children('a').addClass('btn');
        $(this).children('.f_contact').css("display","none");
    })
    $(".f_main_left").on("mouseout","li",function(){
        $(this).children('a').removeClass("btn");
        $(this).children('.f_contact').css("display","block");
    })
    $(".f_main_left").on("click","li",function(){
        var str = $(this).children().eq(0).children("h3").html();
        var val3 = $(this).children().eq(1).children("h3").html();
        var strArr = str.split("<span>");
        var val1 = strArr[0];
        var val2 = strArr[1].split("</span>")[0];
        var valArr = [val1,val2,val3];
        if(localStorage.getItem('readArr')){
            var readArr = localStorage.getItem('readArr').split(',');
            for(var i = 0 ; i < valArr.length ; i++){
                readArr.push(valArr[i]);
            }
            var heavyArr =[];
            var heavyStr = "";
            for(var i =0; i < readArr.length ; i++ ){
                if((i + 1) % 3 == 0){
                    heavyStr += readArr[i]
                    heavyArr.push(heavyStr);
                    heavyStr = '';
                }else{
                    heavyStr += readArr[i]+ ',';
                }
            }
            var readArr = Array.from(new Set(heavyArr));
        }else{
            var readArr = [];
            readArr.push(valArr);
        }
        while(readArr.length > 5){
            heavyArr.shift();
        }
        localStorage.setItem("readArr",readArr);
        f_read();
        return false;
    })

//E f_main_left

//S f_main_right

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

    // E f_btn
    // S f_read

        function f_read(){
            if(localStorage.getItem('readArr')){
                var str = '';
                var heavyStr = '';
                var heavyArr = [];
                var readArr = localStorage.getItem('readArr').split(',');
                for(var i =0; i < readArr.length ; i++ ){
                    if((i + 1) % 3 == 0){
                        heavyStr += readArr[i]
                        heavyArr =  heavyStr.split(',');
                        str += '<li><h4>'+ heavyArr[0] +'<span>'+  heavyArr[1] +'</span></h4><p>'+  heavyArr[2] +'</p></li>';
                        heavyStr = '';
                    }else{
                        heavyStr += readArr[i]+ ',';
                    }
                }
                $(".f_read").children("ul").html(str);
            } 
        }
        f_read();
    // E f_read
//E f_main_right

// S f_feedback
        $(".f_feedback").on('click','div',function(){
            var left = parseInt($(this).css("background-position-x"));
            if($(this).hasClass('f_select')){
                left =  48 + left + 'px';
                $(this).css("background-position-x", left);
                $(this).removeClass('f_select');
                $('.f_feedback .f_btn').addClass('f_ban');
                return false;
            }
            var sibArr = $(this).siblings();
            left =  -48 + left + 'px';
            for(var i =0 ; i < sibArr.length ; i++){
                if(sibArr.eq(i).hasClass('f_select')){
                    var x = sibArr.eq(i).css("background-position-x");
                    x = parseInt(x) + 48 + "px";
                    sibArr.eq(i).css("background-position-x",x);
                }
            }
            $(this).css("background-position-x", left);
            $(this).addClass('f_select').siblings().removeClass('f_select');
            $('.f_feedback .f_btn').removeClass('f_ban');
           
        })


// E f_feedback

// S window滚动事件
    $(window).scroll(function(){
        var top = parseInt($(document).scrollTop());
        if(top > 400){
            $('.f_condition').children("dl").hide();
            $('.f_warpSearch').addClass('f_winGun');
        }else{
            $('.f_condition').children("dl").show();
            $('.f_warpSearch').removeClass('f_winGun');
        }
        
    });
// E window滚动事件




//repuiry E
})
