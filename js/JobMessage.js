require(['loginMod'],function(login){

        // ajax 请求公司数据
        $.ajax({
                type: 'get',
                url: './data/job.json',
                cache: false,
                dataType: 'json',
                success: function (json) {
                        $('.job_status').html(json.title);
                        $('.z_name h1').html(json.job);
                        $('.salary').html(json.salary);
                        var str='';
                        for(var i=0;i<json.welfare.length;i++){
                                str+='<span>'+json.welfare[i]+'</span>';
                        }
                        $('.job_tag').html(str);
                        $('.z_more').show();
                        $('.link_more').hover(function(){
                                $('.z_tagAll').show().html(str);
                                $('.link_more').css('background-color','rgb(71,99,112)');
                        },function(){
                                $('.z_tagAll').hide();
                                $('.link_more').css('background-color','');
                        });
                }
        });
        //立即沟通 点击跳转到页面
        $(".z_btn").bind('click',function(){
                localStorage.setItem('status','reg');
        });

        // 滚动 头部固定
        $(document).scroll(function () {
                if($(document).scrollTop()>300){
                        $('.z_scroll').slideDown(300,'linear');
                }else if($(document).scrollTop()<300){
                        $('.z_scroll').hide();
                };
        });
       // 请求描述等数据
       $.ajax({
               type:'get',
               url:'./data/jobDetailed.json',
               cache:false,
               dataType:'json',
               success:function(json){
                        $('.one').html('<h3>'+json.zpData.title+'</h3>').append('<div class="text"></div>');
                        $('.company-info').html('<h3>'+json.zpData.con+'</h3>').append('<div class="text"></div>');

                       var job=json.zpData.title2;
                       var str ='';var str2='';
                       for(var i=0;i<job.length;i++){
                        str+=job[i].deta+':<br>';
                        for(var j =0 ; j<job[i].minxi.length;j++){
                                str+=job[i].minxi[j]+'<br>';
                        }
                       }
                       $('.one').find('.text').html(str);
                       var str2='';
                       for(var i=0; i<json.zpData.deta2.length;i++){
                               str2+=json.zpData.deta2[i]+'<br>';
                       };
                       $('.company-info').find('.text').html(str2);
               }
       });
        $('.z_icon3').bind('click',function(){
                if($(document).find(".z_wrapall")[0]){
                        $('.z_wrapall').parent().show();
                }else{
                        login.creatLogin();
                        require(['z_login']);
                }  
        });
        // $('.z_icon2').bind('click',function(){
        //         localStorage.setItem('status','reg')
        //         if($(document).find(".z_wrapall")[0]){
        //                 $('.z_wrapall').parent().show()
        //         }else{
        //                 login.creatLogin()
        //                 require(['z_login'])
        //         }
        // })
       //手机号获取和失去焦点
       $('.z_ipt1 ').bind('focus', function () {
        $('.z_book').addClass('z_book1');
    });
    $('.z_ipt1').bind('blur', function () {
        $('.z_book').removeClass('z_book1');
    });

    //验证
    var reg2 = /1[1-8]\d{9}/;  //手机号初步验证
    $('.z_btn_login').bind('click',function(){
           if($('.sing-form').find('.z_ipt1 ').val()==''){
                   $('.tip-error').show().html('请填写手机号');
           } else if(reg2.test($('.sing-form').find('.z_ipt1 ').val())==false){
                $('.tip-error').show().html('请填写正确的手机号');
           }else{
                $('.tip-error').hide();
                if($('.sing-form').find('.z_bg b').text()!='验证通过'){
                        $('.z_bg').find('.tip-error').css({
                                'display':'block',
                                'top':'48px',
                                'color':'red',
                                'text-fill-color':'none' 
                        }).html('请滑动完成验证');
                }
           }
    })

 

})

