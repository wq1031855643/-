
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
    aja(forArr);
    $(this).addClass("f_showCity bg")
})
//单击地区选择，调用forArr2函数
$(".f_cityList ul").on("mouseover","li",function(){
    var code = $(this).attr("code");
    aja(forArr2,code);
})

//模拟滚动条
$(".f_sor p").mousedown("click",function(e){
    this.y = e.offsetY;
    _this = this;
    $(".f_sor").bind("mousemove",function(e){        
        var lTop = e.offsetY - _this.y;
        lTop = lTop < 0 ? 0 : lTop;
        lTop = lTop > 250 ? 250 : lTop;
        $(_this).css("top",lTop);
        return false;
    })
    $(".f_cityList ul").mouseup(function(){
       $(".f_sor").unbind("mousemove");
    })
})