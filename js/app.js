var $li = $(".lunbo ul li"); //获取.b_list里面的所有li，放到$li这个变量里面
var aleft = parseInt($li.parent().css('left'));
var $btn_l = $(".b_btn .b_left");
var $btn_r = $(".b_btn .b_right");
var timer = null;

$(".lunbo ul").append($(".lunbo ul").html());

// 封装函数
function play() {
    if(aleft == 980){
        aleft -= 980;
        auto();
    }
    aleft -= 980;
    $li.parent().animate({left:aleft+'px'},1000);
    // $li.parent().css("left",aleft);
}

//定时轮播
function auto() {
    timer = setInterval(function () {
        if (aleft<= -1960) {
            clearInterval(timer);
            // $li.parent().animate({left:0});
            $li.parent().css("left",0);
            aleft = 980;
        }
        play();
    }, 3000);
}
auto();

//两边耳朵的点击事件
$btn_r.click(function () {
    clearInterval(timer);
    if(aleft <= -1960){
        aleft = 0;
        $li.parent().css("left",0);
    }
        aleft -=980;
        $li.parent().animate({left:aleft+'px'},1000);
    });
$btn_l.click(function () {
    clearInterval(timer);
    if(aleft >= 0){
        aleft = -1960;
        $li.parent().css("left",-1960+'px');
    }
        aleft +=980;
        $li.parent().animate({left:aleft+'px'},1000);
    });

//当我移上d_main的时候停止轮播
$(".b_main .lunbo ul").hover(function () {
    clearInterval(timer);
}, function () {
    //移开重新调用播放
    auto();
});

