require(['loginMod'],function(login){

var citylist = "";
var str = "";
var h_city = "";
var h_type = "";

//模态框引用
function showAll(){
    $('#mtk').modal();
}
function showAll(){
    $('.mBody').show();
    $('.mask').show();
}
//请求数据
$(document).ready(function(){
$.ajax({
    type:'get',
    url:'data/city.json',
    dataType:'json',
    cache:false, //不使用缓存
    success:function (json){
        var h_list = "";
        var cAddress =$('#wrap .text .company-address .content');
        var hotCity = json.zpData.hotCityList;
        citylist = json.zpData.cityList;
        $('.m_Ul0').append('<li>全国</li>');//.m_Ul0添加首项

        for (var i = 1; i < hotCity.length; i++) {//遍历热门城市
            h_list = hotCity[i];
            cAddress.append('<a href="#">'+h_list.name+'</a>');//公司地址添加a内容
            $('.m_Ul0').append('<li>'+h_list.name+'</li>');//.m_Ul0添加li内容
            // h_city +='<li>'+h_list.name+'</li>';
            // str = $('.m_Ul0').html();
        }
        cAddress.append("<a href='#' class = 'showAll'>全国城市</a>");//公司地址添加尾项
        h_city = cAddress.html();
        $('.showAll').click(function(){showAll();});

        for (var i = 0; i < citylist.length; i++) {//遍历全国城市
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
        for (var a = 0; a < s_List.length; a++) {
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
    url:'data/oldindustry.json',
    dataType:'json',
    cache:false, //不使用缓存
    success:function (json){
        var el =$('#wrap .text .industy-type .content');
        var dig = json.zpData;
        for (var i = 0; i < dig.length; i++) {
        var element = dig[i];
        el.append('<a href="#">'+element.name+'</a>');
        h_type +='<a href="#">'+element.name+'</a>'
        }
    },
    error:function (){
        alert('请求失败');
    }
});

//cell招聘信息
$.ajax({
    type:'get',
    url:'data/company.json',
    dataType:'json',
    cache:false, //不使用缓存
    success:function (json){
        var el =$('.company-list');
        var str1 = "";
        var str2 = "";
        var str3 = "";
        for (var i = 0; i < json.length; i++) {
            var str = "";
            str +='<li class="cell"><a href="comdetails.html?type=com"><div class="part1"><img src='+json[i].src+' alt="" class="pl"><div class="pr"><p>'+json[i].comName+'</p><div><span>'+json[i].financing+'</span><em class="vline"></em><span>'+json[i].business+'</span></div></div></div><div class="part2"><span>热招：</span><span class="h">'+json[i].hot+'</span><span>'+json[i].pay+'</span></div></a></li>';
            if(i>55){
                str3 += str;
            }else if(i>27){
                str2 += str;
            }else{
                str1 += str;
            }
        }
        // $('.cell').click(function(){});
        el.append(str1);
        $('.bar').on('click','a',function(){
            $(this).attr('class','nm');
            $(this).siblings().attr('class','');
            switch ($(this).index()){
                case 0:
                case 1:
                    el.html('');
                    el.append(str1);
                case 2:
                    el.html('');
                    el.append(str2);
                case 3:
                    el.html('');
                    el.append(str3);
                case 0:
                case 0:
            }
        });

    },
    error:function (){
        alert('请求失败');
    }
});




$('.xd .li1').hover(function(){
    $('.z_address ul').append(h_city);
    $('.z_type ul').append(h_type);
    $('.z_tage ul').append($('.financing-stage .content').html());
    $('.z_size ul').append($('.company-size .content').html());
    $(this).children('div').show();
    $(this).siblings().children('div').hide();
},function(){
    $('.liz').hide();
});



$('.c_close').click(function(){
    $('.mBody').hide();
    $('.mask').hide();
});

for (var i = 0; i < 31; i++) {
    $('.recruit ul').append('<li>鸡你太美</li>');
}
$('.recruit ul li').css({'cursor': 'pointer'});

$('.z_u2').toggle(function(){
    $('.t2').show();
    $('.zk').html('收起');
},function(){
    $('.t2').hide();
    $('.zk').html('展开');
});


$('.cbox').bind('click',function(){
    $('.mask').show();
    if($(document).find(".z_wrapall")[0]){
            $('.z_wrapall').parent().show()
    }else{
            login.creatLogin()
            require(['z_login'])
    }
    $('.z_close').click(function(){
        $('.mask').hide();
    });
})

});

// 吸顶
$(window).on("scroll", function(){
    console.log(1);
    var top = $(this).scrollTop(); // 当前窗口的滚动距离
    if(top>350){
        $(".xd").show();
    } else{
        $(".xd").hide();
    }
});
})
