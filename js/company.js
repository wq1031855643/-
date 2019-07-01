var citylist = "";
var str = "";
//模态框引用
function showAll(){
    $('#mtk').modal();
}
//请求数据
$(document).ready(function(){
$.ajax({
    type:'get',
    url:'../1906/data/city.json',
    dataType:'json',
    cache:false, //不使用缓存
    success:function (json){
        console.log(json);

        var h_list = "";//人们城市0
        var cAddress =$('#wrap .text .company-address .content');
        var hotCity = json.zpData.hotCityList;
        citylist = json.zpData.cityList;
        $('.m_Ul0').append('<li>全国</li>');//.m_Ul0添加首项

        for (let i = 1; i < hotCity.length; i++) {//遍历热门城市
            h_list = hotCity[i];
            cAddress.append('<a href="#">'+h_list.name+'</a>');//公司地址添加a内容
            $('.m_Ul0').append('<li>'+h_list.name+'</li>');//.m_Ul0添加li内容
            str = $('.m_Ul0').html();
        }
        cAddress.append("<a href='#' onclick='showAll()'>全国城市</a>");//公司地址添加尾项

        for (let i = 0; i < citylist.length; i++) {//遍历全国城市
            c_List = citylist[i];
            $('.m_Ul').append('<li>'+c_List.name+'</li>');//.m_Ul添加li内容
        }
    },
    error:function (){
        alert('请求失败');
    }
});

$('.m_Ul').on('click','li',function(){
    var num = $(this).index();
    console.log(num);
    console.log(citylist);
    if (num>0) {
        $('.m_Ul0').html(' ');
        //城市点击事件
        var s_List = "";//热门城市1
        s_List = citylist[num-1].subLevelModelList;
        for (let a = 0; a < s_List.length; a++) {
            // return s_List[a].name;
            $('.m_Ul0').append('<li>'+s_List[a].name+'</li>')
        }
    }else{
        $('.m_Ul0').html(str);
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
        var dig = json.zpData;
        for (let i = 0; i < dig.length; i++) {
        var element = dig[i];
        el.append('<a href="#">'+element.name+'</a>');
        }
    },
    error:function (){
        alert('请求失败');
    }
});

});

function showAll(){
    $('.mBody').show();
    $('.mask').show();
}