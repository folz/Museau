"use strict";

(function( $, undefined )
{
	ko.bindingHandlers.jPlayer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log(element, $(element));
			$(element).after($('\
<div id="jp_container_1" class="jp-audio">\
	<div class="jp-type-single">\
		<div class="jp-gui jp-interface">\
			<ul class="jp-controls">\
				<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>\
				<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>\
				<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>\
				<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>\
				<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>\
				<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>\
			</ul>\
			<div class="jp-progress">\
				<div class="jp-seek-bar">\
					<div class="jp-play-bar"></div>\
				</div>\
			</div>\
			<div class="jp-volume-bar">\
				<div class="jp-volume-bar-value"></div>\
			</div>\
			<div class="jp-time-holder">\
				<div class="jp-current-time"></div>\
				<div class="jp-duration"></div>\
				<ul class="jp-toggles">\
					<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>\
					<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>\
				</ul>\
			</div>\
		</div>\
		<div class="jp-title">\
			<ul>\
				<li>Bubble</li>\
			</ul>\
		</div>\
		<div class="jp-no-solution">\
			<span>Update Required</span>\
			To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.\
		</div>\
	</div>\
</div>'
			));
		},
		
		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log('update')
			$("#jquery_jplayer_1").jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						"m4a": viewModel.songUrl(),
					});
				},
				swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
				supplied: "m4a",
				errorAlerts: true,
				preload: 'auto',
				wmode: 'window',
			});
			
			$("#jplayer_inspector").jPlayerInspector({jPlayer:$("#jquery_jplayer_1")});
		}
	};
	
	function ViewModel()
	{
		this.songUrl = ko.observable();
		this.seekTime = ko.observable();
	}
	var viewModel = new ViewModel();
	
	$(document).ready(function(){
		$.ajax({
			type: "GET", datatype: "json",
			url: '/ajax/all/',
			success: function(data)
			{
				data = $.parseJSON(data);
				viewModel.songUrl(data['songUrl']);
				viewModel.seekTime(data['seekTime']);
			}
		});
		
		ko.applyBindings(viewModel);
	});
}(jQuery));
