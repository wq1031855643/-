

    //职位ajax请求
    var POSI = '';
    //单击职位调用的函数
    function posiArr(POSI){
        var code = localStorage.getItem("posiTypeCode");
        var str = "";
        for(var i=0,len = POSI.length ; i < len ;i++){
            if(POSI[i].code == code){
                str += '<li code ='+ code +' style= "background:#f1f3f6">'+ POSI[i].name +'</li>';
            }else{
                str += '<li code ='+ POSI[i].code +'>'+ POSI[i].name +'</li>';
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
    });

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
            var code = ($(this).attr("code"));
            localStorage.setItem("posiTypeCode",code)
        }
    });
    

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
                    $(p).css("display","block");
                }
            }else{
                $(sor).children().css("display","none");
            }
        }
        var chi = $(parent).siblings().children();
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
    });
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
    });

    $(".f_posi_sor p").mousedown("click",function(e){
        this.y = e.offsetY;
        var paren = $(this).parent();
        var fh =$(paren).siblings().height() / $(paren).height() + 0.2;
        this.height =  $(paren).height() - $(this).height();
        _this = this;
        if( $(paren).siblings().height() > $(paren).height()){
            $(paren).parent().bind("mousemove",function(e){
                var y = e.pageY - $(this).offset().top;   
                var lTop = y - _this.y;
                lTop = lTop < 1 ? 0 : lTop;
                lTop = lTop > _this.height ? _this.height : lTop;
                lTop = Math.abs(lTop);
                $(_this).css("top",lTop);
                $(paren).siblings().css("top",-lTop * fh);
                return false;
            });
            $(document).mouseup(function(){
                $(paren).parent().unbind("mousemove");
                return false;
            });
        }
        
    });
    $(".f_posi_ul3").click(function(e){
        if(e.target.nodeName == "LI"){
           $(".f_positype b").html( $(e.target).html() );
           $(".f_posiList").css("display","none");
           $(".f_positype").removeClass("bg");
        }

    });

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
    });
    //定义单击公司行业调用函数
    function company(){
        var code = localStorage.getItem("companyCode");
        var str = "<li>不限</li>";
        for(var i=0,len = COM.length ; i < len ;i++){
            if(code == COM[i].code){
                str += '<li code ='+ code +' style="color:#00d7c6">'+ COM[i].name +'</li>';
            }else{
                str += '<li code ='+ COM[i].code +'>'+ COM[i].name +'</li>';
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
    });

    $(".f_company_ul").on("click","li",function(e){
        var code = $(e.target).attr("code");
        localStorage.setItem("companyCode",code);
        $(e.target).css("color","#00d7c6");
        $(".f_company b").html($(e.target).html());
        $(".f_company_ul").css("display","none");
        $(".f_company").removeClass("bg");

    });




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
        
    });

// E f_screening


// S f_main_left
    var cardNUM = 0;
    var cardJSON = [];
    //页面初始化
    $.ajax({
        url:"data/jobDescription.json",
        type:'get',
        dataType:'json',
        success:function(jsonArr){
            for (var key in jsonArr){
                for(var j = 0 ; j < jsonArr[key].length ; j++){
                    cardJSON.push(jsonArr[key][j]);
                }
            }
            f_cardAjax(cardJSON,cardNUM);
        }
    });
    function f_cardAjax(cardJSON,cardNUM){
        $(document).scrollTop(0);
        var str = '';
        var len = cardNUM + 30;
        var jen = cardJSON.length;
        for(var i = cardNUM; i < len && i < jen; i++){
            str += '<li><div class="f_primary"><h3>'+ cardJSON[i].jobName+'<span>'+ cardJSON[i].pay+'</span></h3><p>'+ cardJSON[i].address +'<em></em>'+ cardJSON[i].year+'<em></em>'+cardJSON[i].education+'</p></div><div class="f_company_nama"><h3>'+cardJSON[i].companyName+'</h3><p>'+cardJSON[i].tmt+'<em></em>'+cardJSON[i].financing+'<em></em>'+cardJSON[i].peopleNum+'</p></div><div class="f_contact"><h3><img src="'+cardJSON[i].img +'">'+cardJSON[i].recruiter+'<em></em>'+cardJSON[i].type+'</h3></div><a>立即沟通</a></li>';
        }
        $('.f_main_left').html(str);
        
        
    }

    //分页处理
    $('.f_page').on('click','a',function(){
        var flag = true;
        if($(this).is('.f_prev')){
            if(cardNUM < 30){
                cardNUM = cardNUM + 30;
            }else{
                $('.f_page').children(".f_aselect").removeClass('f_aselect').prev().addClass('f_aselect');
            }
            cardNUM = cardNUM - 30;
            flag = false;
        }
        if($(this).is('.f_next')){
            cardNUM = cardNUM + 30;
            if(cardNUM >= cardJSON.length){
                cardNUM = cardNUM - 30;
            }else{
                    $('.f_page').children(".f_aselect").removeClass('f_aselect').next().addClass('f_aselect');
            }
            flag = false;
        }
        if(flag){
            $(this).addClass('f_aselect').siblings().removeClass('f_aselect');
            cardNUM = ($(this).html() - 1 ) * 30;
        }
        setTimeout(function(){
            f_cardAjax(cardJSON,cardNUM);
        },500)
        
    });



    $(".f_card_left").on("mouseover","li",function(){
        $(this).children('a').addClass('btn');
        $(this).children('.f_contact').css("display","none");
    })
    $(".f_card_left").on("mouseout","li",function(){
        $(this).children('a').removeClass("btn");
        $(this).children('.f_contact').css("display","block");
    })
    $(".f_card_left").on("click","li",function(){
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
        f_card();
        return false;
    });

//E f_main_left

//S f_main_right
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
           
        });


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



