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

    var a_height = $(document).scrollTop();
    $(window).scroll(function(){
        var b_height = $(document).scrollTop();
        console.log(123);
        if(a_height < b_height){
            if(b_height>863){
                $('.chat .text').show().addClass(' animated fadeInDown');
                $('.chat .fadein').show().addClass(' animated fadein');
                $('.chat .footer').show();
                $('.chat .fadein .fade-img1').animate({top:100,left:'12%'},function(){
                $('.chat .fadein .fade-img2').animate({top:135,left:'36%'},function(){
                $('.chat .fadein .fade-img3').animate({top:135,left:'58%'},function(){
                $('.chat .fadein .fade-img4').animate({top:100,right:'12%'},function(){
                $('.chat .footer img:nth-child(1)').animate({left: '17%'},function(){
                $('.chat .footer img:nth-child(2)').animate({top: 115,left: '46%',height: 115},function(){
                $('.chat .footer img:nth-child(3)').animate({bottom: 0,left: '23%',height: 152});
                });});});});});});
            }
            if(b_height>1800){
                $('.direcruit .img').show().addClass(' animated fadeInLeft');
                $('.direcruit .text').show().addClass(' animated fadeInRight');
            }
            if(b_height>2725){
                $('.company .img0').show().addClass(' animated fadeInUp');
                $('.company .text').show().addClass(' animated fadeInDown');
                $('.company .img1').show();
                $('.company .img0 img:nth-child(1)').animate({top:150,right: 170},function(){
                $('.company .img0 img:nth-child(2)').animate({top:177,left:0},function(){
                $('.company .img0 img:nth-child(3)').animate({top:58,left:85},function(){
                $('.company .img0 img:nth-child(4)').animate({top:58,right:50},function(){
                $('.company .img0 img:nth-child(5)').animate({top:256,left:170},function(){
                $('.company .img0 img:nth-child(6)').animate({top:238,right:22});
                });});});});});
            }
            if(b_height>3640){
                $('.decent .text').show().addClass(' animated fadeInLeft');
                $('.decent .img').show().addClass(' animated fadeInRight');
                $('.show_cards,.show_cards li').show().addClass(' animated fadeInDown');
                $('.show_cards li:nth-child(1)').animate({width: 230},function(){
                $('.show_cards li:nth-child(2)').animate({width: 230},function(){
                $('.show_cards li:nth-child(3)').animate({width: 230},function(){
                $('.show_cards li:nth-child(4)').animate({width: 230},function(){
                $('.show_cards li:nth-child(5)').animate({width: 230},function(){
                $('.show_cards li:nth-child(6)').animate({width: 230});});});});});});
            }
            if(b_height>4580){
                $('.media .text').show().addClass(' animated fadeInDown');
                $('.media .img').show().addClass(' animated fadeIn');
                $('.media .text2').show().addClass(' animated fadeInDown');
            }
            if(b_height>4580){
                $('.banner .lunbo').show().addClass(' animated fadeIn');
            }
        }
    });
