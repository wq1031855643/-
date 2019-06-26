window.onload = function(){
	var position = document.getElementsByClassName("l_position_sel")[0];
	var tree1 = document.getElementsByClassName("tree-1")[0];
	
	position.onclick = function() {
		console.log((tree1.childNodes).length)
		if ((tree1.childNodes).length > 1) {
			tree1.style.display = "block";
			return;
		}
		axios.get('/data/position.json')
			.then(function(response) {
				console.log(response);
				if (response.status == 200) {
					var list = response.data.zpData;
					for (var i = 0; i < list.length; i++) {
						var li = "<li id='"+list[i].code+"'>"+list[i].name+"</li>";
						tree1.innerHTML += li;
					}
					tree1.style.display = "block";
				}
			})
			.catch(function(error) {
				console.log(error);
				alert("网络异常");
			});
	}
	
	var lis = tree1.childNodes;
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseout = function(){
			alert(1)
		}
	}
	
	document.onclick = function(){
		tree1.style.display = "none";
	}
}


