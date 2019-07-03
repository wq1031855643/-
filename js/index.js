var tree1 = document.querySelector(".tree-1");
var tree2 = document.querySelector(".tree-2");
var tree3 = document.querySelector(".tree-3");
var list = ""; //职位数据
var newJobs = ""; //最新职位数据
var companyList = ""; //公司tab列表数据

window.onscroll = function() {
	var l_seach_box = document.querySelector(".l_seach_box");
	fixedTop(l_seach_box, 300); //吸顶效果
}

window.onload = function() {
	axios.all([getPosition(), getPosition2(), getJobDescription(), getCompanyTab()])
		.then(axios.spread(function(response, perms, jobs, companys) {
			// console.log(companys);
			// console.log(perms.data);
			if (response.status == 200) {
				showJobs(jobs);
				showCompanys(companys);
				list = response.data.zpData;
				var position2 = perms.data;
				var str = "";
				
				forPosition2(position2,0,12);
				$(".job_menu").append('<div class="show_all" style="display: block;">显示全部职位</div>');
				$(".job_menu").append('<div class="all_job"></div>');
				
				forPosition2(position2,12,position2.length);
				
				$(".all_job").toggle();

				$(".job_menu").on("mouseenter", "ul", function() {
					$(this).addClass("cur");
					$(this).find("a").css("color", "#fff");
					$(this).find("b").css("color", "#fff");
					if ($(this).find(".menu_sub").children().length > 1) {
						return;
					} else {
						$(this).find(".menu_sub").toggle();
						showMemuSub($(this).attr("id"), $(this));
					}
					return false;
				});

				$(".job_menu").on("mouseleave", "ul", function() {
					$(this).find(".menu_sub").empty();
					$(this).find(".menu_sub").toggle();
					$(this).removeClass("cur");
					$(this).find("a").css("color", "#61687c");
					$(this).find("b").css("color", "#414a60");
					return false;
				});

				$(".show_all").on("mouseenter", function() {
					$(this).toggle();
					$(".all_job").toggle();
					return false;
				});

				$(".job_menu").on("mouseleave", "ul", function() {
					if ($(".show_all").css("display") == "none") {
						$(".show_all").toggle();
						$(".all_job").toggle();
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

function getCompanyTab() {
	return axios.get('data/companyTab.json');
}

$(".l_position_sel").on("click", function(eve) {
	var li = "";
	$(".l_select_tree").css("height", "250px");
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

$(".job_tab_box").on("click", "span", function() {
	$(".job_tab_box").find("span").removeClass("cur");
	$(this).addClass("cur");
	$(".job_tab_ul").empty();
	var data = newJobs.data;
	var str = "";
	var address = "";
	switch ($(this).attr("data-name")) {
		case "jr":
			var jobs = data.jr;
			forJobs(jobs);
			break;
		case "it":
			var jobs = data.it;
			forJobs(jobs);
			break;
		case "fdc":
			var jobs = data.fdc;
			forJobs(jobs);
			break;
		case "jypx":
			var jobs = data.jypx;
			forJobs(jobs);
			break;
		case "qc":
			var jobs = data.qc;
			forJobs(jobs);
			break;
		case "ylcm":
			var jobs = data.ylcm;
			forJobs(jobs);
			break;
		case "yljk":
			var jobs = data.yljk;
			forJobs(jobs);
			break;
		case "flzx":
			var jobs = data.flzx;
			forJobs(jobs);
			break;
		case "wl":
			var jobs = data.wl;
			forJobs(jobs);
			break;
		case "cgmy":
			var jobs = data.cgmy;
			forJobs(jobs);
			break;
			defalut:
				break;
	}
})

$(".company_tab_box").on("click", "span", function() {
	$(".company_tab_box").find("span").removeClass("cur");
	$(this).addClass("cur");
	$(".company_tab_ul").empty();
	var data = companyList.data;
	switch ($(this).attr("data-name")) {
		case "rmqy":
			var coms = data.rmqy;
			forCompanys(coms);
			break;
		case "hyjt":
			var coms = data.hyjt;
			forCompanys(coms);
			break;
		case "xrgs":
			var coms = data.xrgs;
			forCompanys(coms);
			break;
		case "ssgs":
			var coms = data.ssgs;
			forCompanys(coms);
			break;
			defalut:
				break;
	}
})

//城市tab点击下一页
$(".next").on("click",function(){
	$(this).toggle();
	$(".prev").toggle();
	$(".slider_city_li").animate({left: "-504px"});
})

$(".prev").on("click",function(){
	$(this).toggle();
	$(".next").toggle();
	$(".slider_city_li").animate({left: 0});
})

//吸顶效果函数
function fixedTop(dom, height) {
	//获取浏览器滚走的距离 
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	//与168比较
	if (sTop > height) {
		//当浏览器滚动到168的距离时让导航nav固定定位，top为0
		dom.style.position = "fixed";
		dom.style.top = 0;
		dom.style.backgroundColor = "#fff";
		dom.style.width = "100%";
		dom.style.border = "solid 2px #f6f6f8";
	} else {
		//否则 定位回到初始状态
		dom.style.position = "static";
		dom.style.backgroundColor = "#f6f6f8";
	}
}

// main主体左边职位展示菜单
function showMemuSub(id, ul) {
	var menu_sub = ul.find(".menu_sub");
	var listchild = "";
	var listchild_child = "";
	var str = "";
	var titleStr = "";
	for (var i = 0; i < list.length; i++) {
		if (list[i].code == id) {
			titleStr = '<p class="menu_title">' + list[i].name + '</p>';
			menu_sub.append(titleStr);
			listchild = list[i].subLevelModelList;
			for (var j = 0; j < listchild.length; j++) {
				listchild_child = listchild[j].subLevelModelList;
				str = '<li><h4>' + listchild[j].name + '</h4><div id="text_list' + j + '"></div></li>';
				menu_sub.append(str);
				for (var k = 0; k < listchild_child.length; k++) {
					$("#text_list" + j + "").append('<a href="#">' + listchild_child[k].name + '</a>');
				}
			}
		}

	}
}

//展示职位tab
function showJobs(data) {
	newJobs = data;
	var data = data.data.it;
	var str = "";
	var address = "";
	forJobs(data);
}

//展示公司tab
function showCompanys(data) {
	companyList = data;
	var coms = data.data.rmqy;
	var str = "";
	forCompanys(coms);
}

function forJobs(jobs) {
	for (var i = 0; i < jobs.length; i++) {
		address = (jobs[i].address).substring(0, 2);
		str = '<li><div class="sub_li"><a href="#" target="_blank"><p class="user_title">' + jobs[i].jobName +
			'<span class="salary">' + jobs[i].pay + '</span></p><p id="job_text">' + address + '<span class="vline"></span>' +
			jobs[i].year + '<span class="vline"></span>' + jobs[i].education +
			'</p></a><a href="#" class="user_info"><p><img src="' + jobs[i].img + '" />' + jobs[i].companyName +
			'<span class="user_text">' + jobs[i].recruiter + '<span class="vline"></span>' + jobs[i].type +
			'</span></p></a></div></li>';
		$(".job_tab_ul").append(str);
	}
}


function forCompanys(coms){
	for (var i = 0; i < coms.length; i++) {
		str = '<li><div class="sub_li"><a class="company_info" href="#"><img src="' + coms[i].src +
			'" /><div class="company_text"><h4>' + coms[i].name + '</h4><p>' + coms[i].financing + '<span class="vline"></span>' +
			coms[i].business + '</p></div></a><a class="about_info" href="#"><p><span class="text_blue">' + coms[i].jobCount +
			'</span>个热招职位<span class="pull_right"><span class="text_blue">' + coms[i].bossCount +
			'</span>位boss在线</span></p></a></div></li>';
		$(".company_tab_ul").append(str);
	}
}

function forPosition2(position2,sIndex,eIndex){
	for (var i = sIndex; i < eIndex; i++) {
		if ((position2[i].pList).length == 3) {
			str = "<ul id='" + position2[i].code + "'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i]
				.pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a><a href='#'>" + position2[i].pList[2] +
				"</a></li><div class='menu_sub'></div></ul>"
		} else if ((position2[i].pList).length == 2) {
			str = "<ul id='" + position2[i].code + "'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i]
				.pList[0] + "</a><a href='#'>" + position2[i].pList[1] + "</a></li><div class='menu_sub'></div></ul>"
		} else {
			str = "<ul id='" + position2[i].code + "'><li><i></i><b>" + position2[i].p + "</b><a href='#'>" + position2[i]
				.pList[0] + "</a></li><div class='menu_sub'></div></ul>"
		}
		if (sIndex > 11) {
			$(".all_job").append(str);
			continue;
		}
		$(".job_menu").append(str);
	}
}