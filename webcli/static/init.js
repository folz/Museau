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
					});
				},
				ended: function (event) {
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
		}
	};
	
	function ViewModel()
	{
		this.coverArt = ko.observable();
		this.songUrl = ko.observable();
		this.upcomingUrl = ko.observable();
		this.seekTime = ko.observable();
		
		this.searchText = ko.observable();
		this.searchResults = ko.dependentObservable(function() {
			return [];
		}, this);
	}
	window.viewModel = new ViewModel();
	
	function updateVM() {
		$.getJSON('/ajax/all/', function(data)
		{
			viewModel.songUrl(data['songUrl']);
			viewModel.seekTime(data['seekTime']);
			viewModel.coverArt(data['coverArt']);
		});
	}
	
	$(document).ready(function(){
		updateVM();
		
		ko.applyBindings(viewModel);
	});
}(jQuery));
