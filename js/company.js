//公司地址数据
$(document).ready(function(){
$.ajax({
    type:'get',
    url:'../1906/data/city.json',
    dataType:'json', 
    cache:false, //不使用缓存
    success:function (json){
        var el =$('#wrap .text .company-address .content');
        console.log(json);
        var hotCity = json.zpData.hotCityList;
        for (let i = 1; i < hotCity.length; i++) {
        var element = hotCity[i];
        el.append('<a href="#">'+element.name+'</a>');
        }
        el.append("<a href=''>全国城市</a>");
    },
    error:function (){
        alert('请求失败');
    }
});

//行业类型数据
$.ajax({
    type:'get',
    url:'../1906/data/oldindustry.json',
    dataType:'json',
    cache:false, //不使用缓存
    success:function (json){
        var el =$('#wrap .text .industy-type .content');
        console.log(json);
        var dig = json.zpData;
        for (let i = 1; i < dig.length; i++) {
        var element = dig[i];
        el.append('<a href="#">'+element.name+'</a>');
        }
    },
    error:function (){
        alert('请求失败');
    }
});

//获取全部城市列表
// $.ajax({
//     type:'get',
//     url:'../1906/data/oldindustry.json',
//     dataType:'json',
//     cache:false, //不使用缓存
//     success:function (json){
//         var el =$('#wrap .text .industy-type .content');
//         console.log(json);
//         var dig = json.zpData;
//         for (let i = 1; i < dig.length; i++) {
//         var element = dig[i];
//         el.append('<a href="#">'+element.name+'</a>');
//         }
//     },
//     error:function (){
//         alert('请求失败');
//     }
// });

});
