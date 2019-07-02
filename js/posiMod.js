define(['jquery','jqmsw'],function (){
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
        $(".f_libcity").click(function(){
            if($(".f_cityList ul").length == 0){
                var str1 = '<div class = "f_cityList"><ul></ul><div class="f_sor"><p></p></div></div><div class = "f_cityOist"><ol></ol><div class="f_sor"><p></p></div></div>';
                $(this).parent().parent().append(str1);
            };
            if( $(".f_cityList").css("display") == "none"){
                $(".f_cityList,.f_cityOist").show();
                var top = $(this).parent().outerHeight() + 1;
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

})