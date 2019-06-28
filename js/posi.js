
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
        
        if($(this).children().eq(0).height() > 300){
            $(this).children().eq(1).css("display","block");
        }
    })
    $(".f_cityList,.f_cityOist").mouseout(function(){
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
        if(Math.floor(un / pf) < 2){
            var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf) + (-3 * delta);
        }else{
            var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf);
        }
        lTop = Math.abs(lTop);
        lTop = lTop < 0 ? 0 : lTop;
        lTop = lTop > 250 ? 250 : lTop;
        $(sor_p).css("top",lTop);
        $(this).css("top",-lTop * Math.floor(un / pf));
        
    })


    //模拟滚动条
    $(".f_sor p").mousedown("click",function(e){
        this.y = e.offsetY;
        _this = this;
        var paren = $(this).parent();
        var fh =$(paren).siblings().height() / $(paren).height();
            fh = Math.floor(fh)
        $(paren).parent().bind("mousemove",function(e){
            var y = e.pageY - $(this).offset().top    
            var lTop = y - _this.y;
            lTop = lTop < 0 ? 0 : lTop;
            lTop = lTop > 250 ? 250 : lTop;
            $(_this).css("top",lTop);
            $(paren).siblings().css("top",-lTop*fh);
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
    // ajaPosi();

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


    $(".f_posiList").on("mouseover",function(e){
        $('.f_posiList .f_posi_sor').css("display","none");
        var pare = e.target.parentNode;
        if(pare.className == "f_posi_ul2"){
            $(".f_posi_ul3").css("display","block");
        }
        var dsor = $(pare).siblings();
        if($(pare).height() > 252 && e.target != this){
            $(dsor).css("display","block");
        }else if(e.target.className == "f_posi_sor" || pare.className == "f_posi_sor"){
            if(pare.className){
                $(pare).css("display","block");
            }else{
                $(e.target).css("display","block");
            }
        }else{
            $('.f_posiList .f_posi_sor').css("display","none");
        }
    })






    $(".f_posiList").on("mousewheel",function(e,delta){
        if(e.target.nodeName == "LI"){
            var pare = e.target.parentNode;
        }
        if(e.target.nodeName == "UL"){
            var pare = e.target;
        }
        if(pare){
            //console.log(pare)
            if(pare.className != "f_posiList"){
                var sor = $(pare).siblings();
               // console.log($(pare).siblings())
                var sor_p = $(sor).children();
                //console.log(sor_p)
                var uh = $(pare).height();
                var ph = $(sor_p).height();
                var fh = $(sor).height();
                var pf = fh - ph;
                var un = uh - fh;
                console.log(Math.floor(un / pf))
                if(Math.floor(un / pf) < 2){
                    var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf) + (-3 * delta);
                    //console.log($(sor_p).css("top"))
                }else{
                    var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf);
                 console.log(lTop)
                }
                
                lTop = Math.abs(lTop);
                
                lTop = lTop < 0 ? 0 : lTop;
                lTop = lTop > 200 ? 200 : lTop;
                $(sor_p).css("top",lTop);
                $(pare).css("top",-lTop * Math.floor(un / pf));

                // console.log(pare,$(pare).css("top",-lTop * Math.floor(un / pf)))

            }
        }
    })

    // $(".f_posiList").mousewheel(function(e,delta){
    //     console.log(e.target)
    //     var sor = $(this ).siblings();
    //     var sor_p = $(this).siblings().children();
    //     var uh = $(this).height();
    //     var ph = $(sor_p).height();
    //     var fh = $(sor).height();
    //     var pf = fh - ph;
    //     var un = uh - fh;
    //     if(Math.floor(un / pf) < 2){
    //         var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf) + (-3 * delta);
    //     }else{
    //         var lTop = parseInt($(sor_p).css("top")) + -delta * Math.floor(un / pf);
    //     }
    //     lTop = Math.abs(lTop);
    //     lTop = lTop < 0 ? 0 : lTop;
    //     lTop = lTop > 250 ? 250 : lTop;
    //     $(sor_p).css("top",lTop);
    //     $(this).css("top",-lTop * Math.floor(un / pf));
    //     console.log(lTop);
        
    // })


})
