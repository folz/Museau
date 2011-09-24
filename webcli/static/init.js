"use strict";

(function( $, undefined )
{
	ko.bindingHandlers.jPlayer = {
		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log(viewModel.songUrl())
			$(element).jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						"m4a": viewModel.songUrl(),
					}).jPlayer("play", viewModel.seekTime());
				},
				ended: function (event) {
					
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
	window.viewModel = new ViewModel();
	
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
