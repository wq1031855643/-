var tree1 = document.querySelector(".tree-1");
var tree2 = document.querySelector(".tree-2");
var tree3 = document.querySelector(".tree-3");
var list = ""; //职位数据

window.onscroll = function(){
	var l_seach_box = document.querySelector(".l_seach_box");
	fixedTop(l_seach_box,300);//吸顶效果
}

window.onload = function() {
	axios.all([getPosition(), getPosition2(),getJobDescription()])
		.then(axios.spread(function(response, perms, jobs) {
			// console.log(response);
			// console.log(perms.data);
			if (response.status == 200) {
				showJobs(jobs);
				var job_menu = document.querySelector(".job_menu");
				list = response.data.zpData;
				var position2 = perms.data;
				var str = "";
				for (var i = 0; i < 12; i++) {
					if ((position2[i].pList).length == 3) {
						str = "<ul id='"+ position2[i].code +"'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a><a href='#'>" + position2[i].pList[2] + "</a></li><div class='menu_sub'></div></ul>"
					} else if ((position2[i].pList).length == 2) {
						str = "<ul id='"+ position2[i].code +"'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a></li><div class='menu_sub'></div></ul>"
					} else {
						str = "<ul id='"+ position2[i].code +"'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a></li><div class='menu_sub'></div></ul>"
					}
					job_menu.innerHTML += str;
				}
				job_menu.innerHTML += '<div class="show_all" style="display: block;">显示全部职位</div>';
				var height = $(".job_menu").height();
				
				$(".job_menu").on("mouseenter","ul",function(){
					$(this).addClass("cur");
					$(this).find("a").css("color","#fff");
					$(this).find("b").css("color","#fff");
					if ($(this).find(".menu_sub").children().length > 1) {
						return;
					}else{
						$(this).find(".menu_sub").toggle();
						showMemuSub($(this).attr("id"),$(this));
					}
					return false;
				});
				
				$(".job_menu").on("mouseleave","ul",function(){
					$(this).find(".menu_sub").empty();
					$(this).find(".menu_sub").toggle();
					$(this).removeClass("cur");
					$(this).find("a").css("color","#61687c");
					$(this).find("b").css("color","#414a60");
					return false;
				});
				
				$(".show_all").on("mouseenter",function(){
					$(".job_menu").css("height","auto");
					$(this).toggle();
					for (var i = 12; i < position2.length; i++) {
						$(".job_menu").find("ul").eq(i).toggle();
						if ((position2[i].pList).length == 2) {
							str = "<ul id='"+ position2[i].code +"'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a></li><div class='menu_sub'></div></ul>"
						}  else {
							str = "<ul id='"+ position2[i].code +"'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a></li><div class='menu_sub'></div></ul>"
						}
						job_menu.innerHTML += str;
					}
					return false;
				});
				
				$(".job_menu").on("mouseleave","ul",function(){
					if ($(".show_all").css("display") == "none") {
						for (var i = 12; i < position2.length; i++) {
							$(".job_menu").find("ul").eq(i).toggle();
							$(".job_menu").css("height",height);
							$(".job_menu").css("background","#fff");
						}
						$(".show_all").toggle();
					}
					return false;
				});
			}
		}))
		.catch(function(error) {
			console.log(error);
			alert("网络异常");
		});
}

function getPosition() {
	return axios.get('data/position.json');
}

function getPosition2() {
	return axios.get('data/position2.json');
}

function getJobDescription() {
	return axios.get('data/jobDescription.json');
}

$(".l_position_sel").on("click",function(eve){
	var li = "";
	$(".l_select_tree").css("height","250px");
	var e = eve || event;
	if ((tree1.childNodes).length > 1) {
		tree1.style.display = "block";
	} else {
		for (var i = 0; i < list.length; i++) {
			li = "<li id='" + list[i].code + "' data-i='" + i + "'>" + list[i].name + "</li>";
			tree1.innerHTML += li;
		}
		tree1.style.display = "block";
	}
	
	//阻止事件冒泡
	if (e && e.stopPropagation) {
		// this code is for Mozilla and Opera
		e.stopPropagation();
	} else if (window.event) {
		// this code is for IE
		window.event.cancelBubble = true;
	}
})


document.onclick = function() {
	tree1.style.display = "none";
	tree2.style.display = "none";
	tree3.style.display = "none";
	(document.querySelector(".l_select_tree")).style.height = 0;
}

//第一级职位ul事件委托
tree1.onmouseover = function(eve) {
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		var lis = tree1.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "";
		}
		target.className = "f2f5f9";
		showTree2(target.getAttribute("data-i")); //展示第二级职位
		tree3.style.display = "none";
	}
}

function showTree2(index) {
	var li = "";
	if ((tree2.childNodes).length > 0) {
		tree2.innerHTML = "";
	}
	tree2.style.display = "block";
	var subLevelModelList = list[index].subLevelModelList;
	for (var i = 0; i < subLevelModelList.length; i++) {
		li = "<li id='" + subLevelModelList[i].code + "' data-l='" + index + "' data-i='" + i + "'>" + subLevelModelList[
			i].name + "</li>";
		tree2.innerHTML += li;
	}
}

//第二级职位ul事件委托
tree2.onmouseover = function(eve) {
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		var lis = tree2.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "";
		}
		target.className = "f2f5f9";
		showTree3(target.getAttribute("data-i"), target.getAttribute("data-l")); //展示第三级职位
	}
}

function showTree3(index1, index2) {
	var li = "";
	if ((tree3.childNodes).length > 0) {
		tree3.innerHTML = "";
	}
	tree3.style.display = "block";
	var subLevelModelList = list[index2].subLevelModelList[index1].subLevelModelList;
	for (var i = 0; i < subLevelModelList.length; i++) {
		li = "<li id='" + subLevelModelList[i].code + "'>" + subLevelModelList[i].name + "</li>";
		tree3.innerHTML += li;
	}
}

//第三级职位ul事件委托
tree3.onmouseover = function(eve) {
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		var lis = tree3.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "";
		}
		target.className = "f2f5f9";
	}
}

tree3.onclick = function(eve) {
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		(document.getElementById("zhi")).innerHTML = target.innerHTML;
	}
}

//吸顶效果函数
function fixedTop(dom,height){
	//获取浏览器滚走的距离 
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	//与168比较
	if(sTop > height){
		//当浏览器滚动到168的距离时让导航nav固定定位，top为0
		dom.style.position = "fixed";
		dom.style.top = 0;
		dom.style.backgroundColor = "#fff";
		dom.style.width = "100%";
		dom.style.border = "solid 2px #f6f6f8";
	}else{
		//否则 定位回到初始状态
		dom.style.position = "static";
		dom.style.backgroundColor = "#f6f6f8";
	}
}

// main主体左边职位展示菜单
function showMemuSub(id,ul){
	var menu_sub = ul.find(".menu_sub");
	var listchild = "";
	var listchild_child = "";
	var str = "";
	var titleStr = "";
	for (var i = 0; i < list.length; i++) {
		if(list[i].code == id){
			titleStr = '<p class="menu_title">'+ list[i].name +'</p>';
			menu_sub.append(titleStr);
			listchild = list[i].subLevelModelList;
			for(var j = 0;j < listchild.length; j++){
				listchild_child = listchild[j].subLevelModelList;
				str = '<li><h4>'+ listchild[j].name +'</h4><div id="text_list'+ j +'"></div></li>';
				menu_sub.append(str);
				for(var k = 0;k < listchild_child.length;k++){
					$("#text_list"+ j +"").append('<a href="#">'+ listchild_child[k].name +'</a>');
				}
			}
		}
		
	}
}

function showJobs(data){
	console.log(data);
	var data = data.data;
	for (var i = 0; i < data.length; i++) {
		data[i]
	}
}