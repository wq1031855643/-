define(['jquery'], function () {

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
                        },function(){
                                $('.z_tagAll').hide()
                        })
                }
        })
        $(".z_btn").bind('click',function(){
                localStorage.setItem('status','reg')
        })



})

