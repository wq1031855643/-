//公司简介

$('.f_textAbos').click(function(){
    $(this).parent().toggleClass('f_select');
    if($(this).is('.f_textAbosHeid')){
        $(this).removeClass('f_textAbosHeid')
        $(this).html("展开")
    }else{
        $(this).html("收起")
        $(this).addClass('f_textAbosHeid')
    }
});

//推荐公司
$('.f_recom label').click(function(){
    $(this).parent().toggleClass('f_recomAction');
    if($(this).is('.bg')){
        $(this).removeClass('bg')
        $(this).html("展开")
    }else{
        $(this).html("收起")
        $(this).addClass('bg')
    }
});
$('.clik').click(function(){
    $('.f_hied').toggle();
});
$(document).scroll(function(){
    if($(document).scrollTop() > 240){
        $('.f_warpcompny').addClass('f_fixed');
    }else{
        $('.f_warpcompny').removeClass('f_fixed'); 
    }
});