var movedata = "";
$.ajax({
    url:'data/position2.json',
    type:'get',
    dataType:'json',
    // async:false,
    success:function(json){
        bigdata(json);

        // console.log(json)
        
    }
})
$.ajax({
    url:'data/position.json',
    type:'get',
    dataType:'json',
     success:function(json){
        movedata=json;
        console.log(json)
        
    }
})
 

// console.log(bigdata)

function bigdata(json2){
    for(var i = 0;i<json2.length;i++){
        $('.data-left').append($('<dd clack="box"><b>'+json2[i].p+'</b></dd>)'))
        for(var j =0;j<json2[i].pList.length;j++){
            $('.data-left').find('dd').eq(i).append($('<a>'+json2[i].pList[j]+'</a>)'))
        }
    }
}

$('.data-left').on('mouseenter','dd',function(){
    // alert(1)
    // console.log(movedata)
    // $('<div class="data-right"></div>');
    // console.log($(this).children().eq(0).text())
    // console.log(movedata.zpData.length)


    for(var z=0;z<movedata.zpData.length;z++){
        // console.log(movedata.zpData[z].name)
        if($(this).children().eq(0).text()==movedata.zpData[z].name){
            // console.log(movedata.zpData[z].name)
            $(this).append($('<div class="data-right"><h5 class="caption">'+movedata.zpData[z].name+'</h5><ol></ol></div>'));
            // console.log($(this).children(".data-right:last-child").children("ol:last-child"))
            for(var x=0;x<movedata.zpData[z].subLevelModelList.length;x++){
                // console.log(x)
                $(this).children(".data-right:last-child").children("ol:last-child").append('<li><h6 class="type">'+movedata.zpData[z].subLevelModelList[x].name+'</h6><div class="details"></div></li>')

                for(var c=0;c<movedata.zpData[z].subLevelModelList[x].subLevelModelList.length;c++){
                    // console.log(c)
                    $(this).children(".data-right:last-child").children("ol:last-child").children().eq(x).children(".details:last-child").append('<a href="#">'+movedata.zpData[z].subLevelModelList[x].subLevelModelList[c].name+'</a>')
                    // console.log(movedata.zpData[z].subLevelModelList[x].subLevelModelList[c].name)
                }
            }
        }
    }
})



$('.data-left').on('mouseleave','dd',function(){
    // alert(1)
    $('.data-right').remove()
})

 


