require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
		'head':'head',
		'Job':'JobMessage',
	}
});

require(["hm","head","Job"], function(hm) {
	hm.creatHead();
});
