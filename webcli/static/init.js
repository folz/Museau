"use strict";

(function( $, undefined )
{
	ko.bindingHandlers.jPlayer = {
		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log("jPlayer updated! Now playing "+viewModel.title()+" at URL "+viewModel.songUrl());
			$(element).jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						'mp3': viewModel.songUrl(),
					}).jPlayer("play");
				},
				ended: function (event) {
					updateVM();
					$(this).jPlayer("setMedia", {
						'mp3': viewModel.songUrl(),
					}).jPlayer("play");
				},
				swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
				supplied: "mp3",
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
		this.title = ko.observable();
		this.artist = ko.observable();
		this.album = ko.observable();

		/*this.searchText = ko.observable('');
		this.searchResults = ko.observableArray([]);
		this.timeout = function() {};
		
		this.performSearch = ko.dependentObservable(function () {
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
		}, this);*/
	}
	window.viewModel = new ViewModel();
	
	function updateVM() {
		$.getJSON('/ajax/all/', function(data)
		{
			viewModel.title(data['songTitle']);
			viewModel.songUrl(data['audioURL']);
			viewModel.coverArt(data['artistArtUrl']);
			viewModel.artist(data['artistSummary']);
			viewModel.album(data['albumTitle']);
		});
	}
	
	$(document).ready(function(){
		updateVM();
		
		ko.applyBindings(viewModel);
	});
}(jQuery));
