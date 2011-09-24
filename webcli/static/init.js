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
		
		this.searchText = ko.observable('');
		this.searchResults = ko.observableArray([]);
		this.timeout = function() {};
		
		this.performSearch = ko.dependentObservable(function () {
			console.log('updated');
			var searchText = this.searchText();
			var results = this.searchResults;

			if (this.timeout) clearTimeout(this.timeout);

			this.timeout = setTimeout(function () {
				$.getJSON('/ajax/search',
					{ searchText: searchText },
					function (data) {
						updateVM(data);
					}
				);
			}, 500);
		}, this);
	}
	window.viewModel = new ViewModel();
	
	function updateVM(data) {
		if (data) {
			viewModel.songUrl(data['songUrl']);
			viewModel.seekTime(data['seekTime']);
			viewModel.coverArt(data['coverArt']);
		} else {
			$.getJSON('/ajax/all/', function(data)
			{
				viewModel.songUrl(data['songUrl']);
				viewModel.seekTime(data['seekTime']);
				viewModel.coverArt(data['coverArt']);
			});
		}
	}
	
	$(document).ready(function(){
		updateVM();
		
		ko.applyBindings(viewModel);
	});
}(jQuery));

function insert_message(msg) {
	$.ajax({
		url: "192.168.56.101:8001/msg",
		data: {
			
		},
		success: function(data) {
			
		},
	});
}
