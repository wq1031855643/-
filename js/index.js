var position = document.getElementsByClassName("l_position_sel")[0];
var tree1 = document.getElementsByClassName("tree-1")[0];
var tree2 = document.getElementsByClassName("tree-2")[0];
var tree3 = document.getElementsByClassName("tree-3")[0];
var job_menu = document.getElementsByClassName("job_menu")[0];
var list = ""; //职位数据
var l_seach_box = document.querySelector(".l_seach_box ");

window.onscroll = function(){
	fixedTop(l_seach_box,300);//吸顶效果
}



window.onload = function() {
	axios.all([getPosition(), getPosition2()])
		.then(axios.spread(function(response, perms) {
			// console.log(response);
			// console.log(perms.data);
			if (response.status == 200) {
				list = response.data.zpData; //第一级职位数据
				var position2 = perms.data;
				var str = "";
				for (var i = 0; i < position2.length; i++) {
					if ((position2[i].pList).length == 3) {
						str = "<ul><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a><a href='#'>" + position2[i].pList[2] + "</a></li></ul>"
					} else if ((position2[i].pList).length == 2) {
						str = "<ul><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a></li></ul>"
					} else {
						str = "<ul><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i].pList[0] + "</a></li></ul>"
					}
					job_menu.innerHTML += str;
				}
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

job_menu.onmouseover = function(eve) {
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "UL") {
		target.className = "cur";
	}
}

position.onclick = function(eve) {
	var e = eve || event;
	if ((tree1.childNodes).length > 1) {
		tree1.style.display = "block";
	} else {
		for (var i = 0; i < list.length; i++) {
			var li = "<li id='" + list[i].code + "' data-i='" + i + "'>" + list[i].name + "</li>";
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
}


document.onclick = function() {
	tree1.style.display = "none";
	tree2.style.display = "none";
	tree3.style.display = "none";
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
	if ((tree2.childNodes).length > 0) {
		tree2.innerHTML = "";
	}
	tree2.style.display = "block";
	var subLevelModelList = list[index].subLevelModelList;
	for (var i = 0; i < subLevelModelList.length; i++) {
		var li = "<li id='" + subLevelModelList[i].code + "' data-l='" + index + "' data-i='" + i + "'>" + subLevelModelList[
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
	if ((tree3.childNodes).length > 0) {
		tree3.innerHTML = "";
	}
	tree3.style.display = "block";
	var subLevelModelList = list[index2].subLevelModelList[index1].subLevelModelList;
	for (var i = 0; i < subLevelModelList.length; i++) {
		var li = "<li id='" + subLevelModelList[i].code + "'>" + subLevelModelList[i].name + "</li>";
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
	}else{
		//否则 定位回到初始状态
		dom.style.position = "static";
		dom.style.backgroundColor = "#f6f6f8";
	}
}