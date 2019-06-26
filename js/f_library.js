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

function forArr(jsonArr){
    var str = "";
    for(var i=0,len = jsonArr.length ; i < len ;i++){
        str += '<li code ='+ jsonArr[i].code +'>'+ jsonArr[i].name +'</li>'
    }
    $(".f_cityList ul").html(str);
}
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


