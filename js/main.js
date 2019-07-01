require.config({
	baseUrl: 'js',
	paths: {
		'hm': 'headMod',
	}
});

require(["hm"], function(hm) {
	hm.creatHead();
	hm.creatFooter();
	// hm.creatSide();
});
