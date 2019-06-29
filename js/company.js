$(document).ready(function(){
    $.ajax({
        type:'get',
        url:'../data/city.json',
        dataType:'json',
        cache:false, //不使用缓存
        success:function (json){
            console.log(json);
            var dig = json.hotCityList;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
            }
            $('#wrap .text.content').html()+=`
            <a>${element.name}</a>
            `;
        },
        error:function (){
            alert('请求失败');
        }
    });
});