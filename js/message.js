$.ajax({
    url: 'data/graphicList.json',
    type: 'get',
    dataType: 'json',
    success: function(json) {
        boxtop(json);
        boxbottom(json);
    }
});
function boxtop(json) {
    for (var i = 1; i < 4; i++) {
        $('.xw_jou-top ul').append(function() {
            return $('<li><h6><b>数据报告</b><span>more</span></h6><a class="xw_moveimg" href="' + json[i].href + '" target="_blank"><img src="' + json[i].img + '" alt=""></a><a class="xw_textcon" href="' + json[i].href + '" target="_blank">' + json[i].title + '</a><a class="xw_examine" href="' + json[i].href + '" target="_blank">查看详情</a></li>')
        })
    }
};
var index = 4;
function boxbottom(json) {
    cycle(json);
    $('.xw_more').click(function() {
        if (index < 33) {
            cycle(json)
        }
    })
};
function cycle(json) {
    $('.xw_more').text('正在加载。。。');
    for (var i = 0; i < 10; i++) {
        if (index > 32) {
            $('.xw_more').text('没有更多了');
            return;
        };
        $('.xw_jou-bottom ol').append(function() {
            return $('<li><div class="xw_jou-bottom-left"><a class="xw_article" href="' + json[index].href + '" target="_blank"><img src="' + json[index].img + '" alt=""></a><a class="xw_picture" href="' + json[index].href + '" target="_blank">干活文章</a></div><div class="xw_jou-bottom-right"><a href="' + json[index].href + '" target="_blank">' + json[index].title + '</a><p>' + json[index].description + '</p><span>' + json[index].author + '</span></div></li>')
        });
        index++;
    };
    $('.xw_more').text('浏览更多');
};
$('.xw_more').hover(function() {
    if ($('.xw_more').text() == '浏览更多') {
        $('.xw_more').css({
            'color': '#53cac3',
            'background': '#fafafa',
        });
    };
},
function() {
    $('.xw_more').css({
        'color': '#bbb',
        'background': '',
    });
});
var emailReg = /^\w{3,20}@[0-9a-zA-Z]{2,6}(\.[a-zA-Z]{2,3}){1,2}$/;
var phonelReg = /^1[3456789]\d{9}$/;
var emailnf = false;
var phonenf = false;
var namenf = false;
var companynf = false;
var postnf = false;
$('.xw_submit').click(function() {
    if (emailnf == false && phonenf == false && namenf == false && companynf == false && postnf == false) {
        return false;
    }
    $('.xw_media-wrap').hide();
});
$('.xw_shut').click(function() {
    $('.xw_media-wrap').hide();
});
$('.xw_media-off').click(function() {
    $('.xw_media-wrap').show();
});
$('#form').on('blur', 'p',
function() {
    var ipt = $('#form p');
    for (var s = 0; s < ipt.length; s++) {
        if (s == $('#form p').index($(this)[0])) {
            var aaa = $(this).children(":first").attr('placeholder');
            if (aaa == '请输入你的邮箱') {
                if ($(this).children(":first").val() == '') {
                    $(this).children(":last").css('display', 'block').html('请填写邮箱地址' + '<i></i>');
                    emailnf = false;
                } else if (emailReg.test($(this).children(":first").val())) {
                    $(this).children(":last").css('display', 'none').html('请填写邮箱地址' + '<i></i>');
                    emailnf = true;
                } else {
                    $(this).children(":last").css('display', 'block').html('请正确填写邮箱地址' + '<i></i>');
                    emailnf = false;
                }
            } else if (aaa == '请输入你的手机号') {
                if ($(this).children(":first").val() == '') {
                    $(this).children(":last").css('display', 'block').html('请填写手机号' + '<i></i>');
                    phonenf = false;
                } else if (phonelReg.test($(this).children(":first").val())) {
                    $(this).children(":last").css('display', 'none').html('请填写手机号' + '<i></i>');
                    phonenf = true;
                } else {
                    $(this).children(":last").css('display', 'block').html('请正确填写手机号' + '<i></i>');
                    phonenf = false;
                }
            } else if (aaa == '请输入你的姓名') {
                if ($(this).children(":first").val() == '') {
                    $(this).children(":last").css('display', 'block').html('请输入您的姓名' + '<i></i>');
                    namenf = false;
                } else {
                    $(this).children(":last").css('display', 'none').html('请输入您的姓名' + '<i></i>');
                    namenf = true;
                }
            } else if (aaa == '请输入你的公司名称') if ($(this).children(":first").val() == '') {
                $(this).children(":last").css('display', 'block').html('请输入您的公司名称' + '<i></i>');
                companynf = false;
            } else {
                $(this).children(":last").css('display', 'none').html('请输入您的公司名称' + '<i></i>');
                companynf = true;
            }
        } else if (aaa == '请输入你的Title') {
            if ($(this).children(":first").val() == '') {
                $(this).children(":last").css('display', 'block').html('请输入您的职位名称' + '<i></i>');
                postnf = false;
            } else {
                $(this).children(":last").css('display', 'none').html('请输入您的职位名称' + '<i></i>');
                postnf = true;
            }
        }
    }
})