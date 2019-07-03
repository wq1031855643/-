require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'head':'head',
		'jquery':'jquery',
	}
});

require(["hm","head"], function(hm) {
	hm.creatHead();
});
