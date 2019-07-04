console.log(2);
// 吸顶
$(window).bind('scroll',function(){
    alert("1");
    })
console.log($(window));

$(window).scroll(function(){
    alert("3");
    /* ...do something... */
    })
$(window).on("scroll", function(){
    console.log(1);
    var top = $(this).scrollTop(); // 当前窗口的滚动距离
    if(top>350){
        $(".xd").show();
    } else{
        $(".xd").hide();
    }
});
