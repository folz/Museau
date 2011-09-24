$(document).ready(function(){

	$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				"m4a": "http://audio-ash-t2-1.pandora.com/access/?version=4&lid=37334406&token=VFn2bFrwT5B%2BH49QMpYEY3whbCJHKVc2aTdrj4Fsd3a62s%2FZaJaejwhRZe1B0fzl7rFwG1TFF8j9riQZHo7kWablLyB489tpr8S0KR3XUBsz%2B%2B7pmfZ23xMpjVt7Jh%2BY74bmk8Ey5nKToGVhM%2BuimkqAXewg9fmrcPILfNBdI6RJfOp4YxyhDtNhY9As%2Fr7Mw2iNg2gZrgis9KNilX5luwLbkc%2Bxs9Pi9jnqFb1JYZ3oqX%2BoOqGkjx3pXQqHeF2GjnRkact6hDUWYm7vSEHbZlcmUtaf%2FSU3H6MeFnKYZhweFVrers%2BVfi0aug58Y7G%2BtfAka9Oh18d9CEAS8WmnyQ%3D%3D",
			});
		},
		swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
		supplied: "m4a",
		solution: "flash, html",
		errorAlerts: true,
		preload: 'auto',
	});

	$("#jplayer_inspector").jPlayerInspector({jPlayer:$("#jquery_jplayer_1")});
});
