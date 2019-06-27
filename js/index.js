var position = document.getElementsByClassName("l_position_sel")[0];
var tree1 = document.getElementsByClassName("tree-1")[0];
var tree2 = document.getElementsByClassName("tree-2")[0];
var tree3 = document.getElementsByClassName("tree-3")[0];
var list = ""; //职位数据

window.onload = function() {
	axios.get('/data/position.json')
		.then(function(response) {
			console.log(response);
			if (response.status == 200) {
				list = response.data.zpData; //第一级职位数据
				subLevelModelList = list.subLevelModelList; //第二级职位数据
			}
		})
		.catch(function(error) {
			console.log(error);
			alert("网络异常");
		});
}

position.onclick = function(eve) {
	var e = eve || event;
	if ((tree1.childNodes).length > 1) {
		tree1.style.display = "block";
	} else {
		for (var i = 0; i < list.length; i++) {
			var li = "<li id='" + list[i].code + "' data-i='"+i+"'>" + list[i].name + "</li>";
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
tree1.onmouseover = function(eve){
	var e = eve || event;
	var target = e.target || e.srcElement;
		if (target.tagName == "LI") {
		var lis = tree1.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "";
		}
		target.className = "f2f5f9";
		showTree2(target.getAttribute("data-i"));//展示第二级职位
		tree3.style.display = "none";
	}
}

function showTree2(index){
	if ((tree2.childNodes).length > 0) {
		tree2.innerHTML = "";
	}
	tree2.style.display = "block";
	var subLevelModelList = list[index].subLevelModelList;
	for (var i = 0; i < subLevelModelList.length; i++) {
		var li = "<li id='" + subLevelModelList[i].code + "' data-l='"+index+"' data-i='"+i+"'>" + subLevelModelList[i].name + "</li>";
		tree2.innerHTML += li;
	}
}

//第二级职位ul事件委托
tree2.onmouseover = function(eve){
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		var lis = tree2.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "";
		}
		target.className = "f2f5f9";
		showTree3(target.getAttribute("data-i"),target.getAttribute("data-l"));//展示第三级职位
	}
}

function showTree3(index1,index2){
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
tree3.onmouseover = function(eve){
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

tree3.onclick = function(eve){
	var e = eve || event;
	var target = e.target || e.srcElement;
	if (target.tagName == "LI") {
		(document.getElementById("zhi")).innerHTML = target.innerHTML;
	}
}