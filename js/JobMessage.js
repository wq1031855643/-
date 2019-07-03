define(['jquery'], function () {
        // ajax 请求公司数据
        $.ajax({
                type: 'get',
                url: 'http://localhost/project/data/job.json',
                cache: false,
                dataType: 'json',
                success: function (json) {
                        $('.job_status').html(json.title)
                        $('.z_name h1').html(json.job)
                        $('.salary').html(json.salary)
                        var str=''
                        for(var i=0;i<json.welfare.length;i++){
                                str+='<span>'+json.welfare[i]+'</span>'
                        }
                        $('.job_tag').html(str)
                        $('.z_more').show()
                        $('.link_more').hover(function(){
                                $('.z_tagAll').show().html(str)
                                $('.link_more').css('background-color','rgb(71,99,112)')
                        },function(){
                                $('.z_tagAll').hide()
                                $('.link_more').css('background-color','')
                        })
                }
        })
        //立即沟通 点击跳转到页面
        $(".z_btn").bind('click',function(){
                localStorage.setItem('status','reg')
        })

        // 滚动 头部固定
        $(document).scroll(function () {
                if($(document).scrollTop()>300){
                        $('.z_scroll').slideDown(500,'linear')
                }else{
                        $('.z_scroll').hide()
                }
        })
       // 请求描述等数据
       $.ajax({
               type:'get',
               url:'http://localhost/project/data/jobDetailed.json',
               cache:false,
               dataType:'json',
               success:function(json){
                        $('.one').html('<h3>'+json.zpData.title+'</h3>').append('<div class="text"></div>')
                        $('.company-info').html('<h3>'+json.zpData.con+'</h3>').append('<div class="text"></div>')

                       var job=json.zpData.title2;
                       var str ='';var str2=''
                       for(var i=0;i<job.length;i++){
                        str+=job[i].deta+':<br>'
                        for(var j =0 ; j<job[i].minxi.length;j++){
                                str+=job[i].minxi[j]+'<br>'
                        }
                       }
                       $('.one').find('.text').html(str)
                       var str2=''
                       for(var i=0; i<json.zpData.deta2.length;i++){
                               str2+=json.zpData.deta2[i]+'<br>'
                       }
                       $('.company-info').find('.text').html(str2)
               }
       })
})

