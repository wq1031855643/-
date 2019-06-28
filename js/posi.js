
define(['jquery','jqmsw'],function () {
	

    //请求ajax函数
    function  aja(arr,code){
        $.ajax({
            url:"data/city.json",
            type:'get',
            dataType:'json',
            success:function(json){
                var jsonArr = json.zpData.cityList;
                var str = arr(jsonArr,code);
            }
        })
    }

    //单击地区选择时，调用请求ajax函数，并获得相应数据
    function forArr(jsonArr){
        var str = "";
        for(var i=0,len = jsonArr.length ; i < len ;i++){
            str += '<li code ='+ jsonArr[i].code +'>'+ jsonArr[i].name +'</li>'
        }
        $(".f_cityList ul").html(str);
    }
    //鼠标移动到省会时，调用请求ajax函数，并获得相应数据
    function forArr2(jsonArr,code){
        var str = "";
        for(var i=0,len = jsonArr.length ; i < len ;i++){
            if(code == jsonArr[i].code){
                var str2 = "";
                var lenArr = jsonArr[i].subLevelModelList;
                for(var j=0,len=lenArr.length;j<len;j++){
                        str2 += '<li>'+ lenArr[j].name +'</li>'; 
                }
                str += '<li code ='+ jsonArr[i].code +'>'+ str2 +'</li>'
            }  
        }
        $(".f_cityOist ol").html(str);
    }

    //单击地区选择，调用forArr函数
    $(".f_sel span").click(function(){
        if($(".f_cityList").css("display") == "none"){
            $(".f_cityList,.f_cityOist").css("display","block");
            aja(forArr);
            $(this).addClass("f_showCity bg");
        }else{
            $(".f_cityList,.f_cityOist").css("display","none");
            $(this).removeClass("f_showCity bg");
        } 
    })
    //单击地区选择，调用forArr2函数
    $(".f_cityList ul").on("mouseover","li",function(){
        var code = $(this).attr("code");
        aja(forArr2,code);
    })

    $(".f_cityList,.f_cityOist").mouseover(function(){
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
        var lTop = parseInt($(sor_p).css("top")) + -delta * un / pf;
        lTop = Math.abs(lTop);
        lTop = lTop < 0 ? 0 : lTop;
        lTop = lTop > pf ? pf : lTop;
        $(sor_p).css("top",lTop);
        $(this).css("top",-lTop  * un / pf);  
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
            lTop = lTop < 0 ? 0 : lTop;
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




    //单击职位选择

    function  ajaPosi(){
        $.ajax({
            url:"data/position.json",
            type:'get',
            dataType:'json',
            success:function(json){
                var jsonArr = json.zpData;
                var str = "";
                for(var i=0,len = jsonArr.length ; i < len ;i++){
                    str += '<li code ='+ jsonArr[i].code +'>'+ jsonArr[i].name +'</li>'
                }
                $(".f_posiList .f_posi_ul1").html(str);
            }
        })
    }
    ajaPosi();

    $(".f_posiList .f_posi_ul1").on("mousemove","li",function(e){
        var code = $(e.target).attr("code");
        $.ajax({
            url:"data/position.json",
            type:'get',
            dataType:'json',
            success:function(json){
                var jsonArr = json.zpData;
                for(var i=0,len = jsonArr.length ; i < len ;i++){
                    if(code == jsonArr[i].code){
                        var str2 = "";
                        var lenArr = jsonArr[i].subLevelModelList;
                        for(var j=0,len=lenArr.length;j<len;j++){
                            str2 += '<li code = '+ lenArr[j].code +'>'+ lenArr[j].name +'</li>'; 
                        }
                        $(".f_posiList .f_posi_ul2").html(str2);
                    }  
                }  
            }
        })
    })
    $(".f_posiList .f_posi_ul2").on("mousemove","li",function(e){
        var code = $(e.target).attr("code");
        $.ajax({
            url:"data/position.json",
            type:'get',
            dataType:'json',
            success:function(json){
                var jsonArr = json.zpData;
                var str = "";
                for(var i=0,len = jsonArr.length ; i < len ;i++){
                    var josnJrr = jsonArr[i].subLevelModelList;
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
        })
    })



    $(".f_posi_ul1,.f_posi_ul2,.f_posi_ul3,.f_posi_d2").mouseover(function(){
        var paren = $(this).children()[0];
        if(this.className != "f_posi_d2"){
            var parent = $(this).parent();
            var sor = $(this).siblings().eq(0);
            var lh = $(this).height();
            var sor_h = $(sor).height();
            var ratio = lh / sor_h - 0.3;
            if(lh > sor_h){
                $(sor).css("display","block");
                var p = $(sor).children()[0];
                if(p.nodeName == "P"){
                    $(p).css("height", sor_h / ratio);
                }
            }
        }
        var chi = $(parent).siblings().children()
        for(var i = 0,len = chi.length; i < len; i++){
            if(chi[i].nodeName == "DIV"){
                $(chi[i]).css("display","none");
                if($(chi[i]).siblings().className !== ".f_posi_ul1"){
                    $(chi[i]).children().eq(0).css("top",0);
                    $(chi[i]).siblings().css("top",0);
                }
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
        var lTop = parseInt($(sor_p).css("top")) + -delta * un / pf;
        lTop = Math.abs(lTop);
        lTop = lTop < 0 ? 0 : lTop;
        lTop = lTop > pf ? pf : lTop;
        $(sor_p).css("top",lTop);
        $(this).css("top",-lTop  * un / pf);  
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
                lTop = lTop < 0 ? 0 : lTop;
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
        }
        
    })



    

    



})
