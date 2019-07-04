$.ajax({
    url:'data/graphicList.json',
    type:'get',
    dataType:'json',
    success:function(json){
        boxtop(json);
        boxbottom(json);
    }
});
function boxtop(json){ //这是新闻上半段DOM元素
    for(var i=1;i<4;i++){
        $('.xw_jou-top ul').append (function(){
            return $('<li><h6><b>数据报告</b><span>more</span></h6><a class="xw_moveimg" href="'+json[i].href+'" target="_blank"><img src="'+json[i].img+'" alt=""></a><a class="xw_textcon" href="'+json[i].href+'" target="_blank">'+json[i].title+'</a><a class="xw_examine" href="'+json[i].href+'" target="_blank">查看详情</a></li>')
        });
    }
    
};
console.log($('.xw_more'))
var index=4; //这是新闻下半段DOM元素
function boxbottom(json){
    cycle(json);
    $('.xw_more').click(function(){//这是点击时再次加载
         if(index < 33){
             cycle(json)
        }
    })
};
function cycle(json){
    $('.xw_more').text('正在加载。。。');
    for(var i=0;i<10;i++){
        if(index > 32){
            $('.xw_more').text('没有更多了');
            return;
        };
        $('.xw_jou-bottom ol').append (function(){
            return $('<li><div class="xw_jou-bottom-left"><a class="xw_article" href="'+json[index].href+'" target="_blank"><img src="'+json[index].img+'" alt=""></a><a class="xw_picture" href="'+json[index].href+'" target="_blank">干活文章</a></div><div class="xw_jou-bottom-right"><a href="'+json[index].href+'" target="_blank">'+json[index].title+'</a><p>'+json[index].description+'</p><span>'+json[index].author+'</span></div></li>')
        });
        index++;
    };
    $('.xw_more').text('浏览更多');
};
$('.xw_more').hover(function () {
    if($('.xw_more').text()=='浏览更多'){
        $('.xw_more').css({
            'color':'#53cac3',
            'background':'#fafafa',
        });
    };
},function(){
    $('.xw_more').css({
        'color':'#bbb',
        'background':'',
    });
});

