require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'jquery':"jquery-1.8.3",
		'jqmsw':"jquery.mousewheel",
		'posi':'posi',
		'head':"head"
	}
});

require(["hm",'jquery','jqmsw','posi','head'], function(hm) {
	hm.creatHead();
});
