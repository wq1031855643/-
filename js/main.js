require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'jquery':"jquery-1.8.3",
		'jqmsw':"jquery.mousewheel",
		'posi':'posi'
	}
});

require(["hm",'jquery','jqmsw','posi'], function(hm) {
	hm.creatHead();
});
