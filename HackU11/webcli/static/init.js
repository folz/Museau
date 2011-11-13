;(function( $, undefined )
{
	ko.bindingHandlers.jPlayer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			$(element).jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						mp3: viewModel.json().audioURL,
					}).jPlayer("play");
				},
				ended: function (event) {
					updateVM();
				},
				swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
				supplied: "mp3",
				preload: 'auto',
				wmode: 'window',
			});
		},
		
		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log("jPlayer updated! Now playing "
						+ viewModel.json().songTitle
						+ " by "
						+ viewModel.json().artistSummary
						+ " at URL "
						+ viewModel.json().audioURL);
			$(element).jPlayer("clearMedia").jPlayer("setMedia", {
				mp3: viewModel.json().audioURL
			}).jPlayer("play");
		}
	};
	
	function ViewModel()
	{
		this.json = ko.observable({});
		
		this.history = ko.observableArray([]);
		
		this.addHistory = function(json)
		{
			this.history.unshift(json);
		}
		
		this.forceUpdateHistory = function($data)
		{
			viewModel.json($data);
			viewModel.addHistory(viewModel.json());
		}
		
		/***
		 *  accessors for the view
		 ***/
		 
		this.songUrl = ko.dependentObservable(function(key)
		{
			return this.json()['audioURL'];
		}, this);
		this.albumArt = ko.dependentObservable(function(key)
		{
			return this.json()['artistArtUrl'];
		}, this);
		this.title = ko.dependentObservable(function(key)
		{
			return this.json()['songTitle'];
		}, this);
		this.artist = ko.dependentObservable(function(key)
		{
			return this.json()['artistSummary'];
		}, this);
		this.album = ko.dependentObservable(function(key)
		{
			return this.json()['albumTitle'];
		}, this);
	}
	window.viewModel = new ViewModel();
	
	function updateVM()
	{
		$.getJSON('/ajax/next_song.json', function(data)
		{
			data['artistArtUrl'] = data['artistArtUrl'] || "/static/img/noalbumart.png";
			viewModel.json(data);
			viewModel.addHistory(viewModel.json());
		});
	}
		
	$(document).ready(function()
	{
		updateVM();
		ko.applyBindings(viewModel);
	});
}(jQuery));
