;(function( $, undefined )
{
	var bridge;
	
		
	
	function ViewModel()
	{
		this.stations = ko.observableArray([]);
		
		this.json = ko.observable({});
		
		this.history = ko.observableArray([]);
		
		this.songUrl = ko.computed(function(key)
		{
			return this.json()['audioURL'];
		}, this);
		
		this.albumArt = ko.computed(function(key)
		{
			return this.json()['artistArtUrl'];
		}, this);
		
		this.title = ko.computed(function(key)
		{
			return this.json()['songTitle'];
		}, this);
		
		this.artist = ko.computed(function(key)
		{
			return this.json()['artistSummary'];
		}, this);
		
		this.album = ko.computed(function(key)
		{
			return this.json()['albumTitle'];
		}, this);
	}
	window.viewModel = new ViewModel();
	
	viewModel.getStations = function()
	{
		bridge.getService("pandora", function (service) {
			service.getStationList(function(data) {
				viewModel.stations(data);
		
		this.quickMix = ko.computed(function(key)
		{
			return ko.utils.arrayFilter(this.stations(), function(item)
			{
				return item['isQuickMix'];
			})[0];
		}, this);
		
		this.addHistory = function(json)
		{
			this.history.unshift(json);
		}
		
		this.forceUpdateHistory = function($data)
		{
			viewModel.json($data);
			viewModel.addHistory(viewModel.json());
		}
		
		this.updateVM = function()
		{
			$("#jquery_jplayer_1").jPlayer("pause");
			bridge.getService("pandora", function(service)
			{
				service.getNextSong(function(data) {
					data['artistArtUrl'] = data['artistArtUrl'] || "/static/img/noalbumart.png";
					viewModel.json(data);
					viewModel.addHistory(viewModel.json());
				});
			});
		});
	}
	
	viewModel.updateVM = function()
	ko.bindingHandlers.jPlayer =
	{
		$("#jquery_jplayer_1").jPlayer("pause");
		bridge.getService("pandora", function (service) {
			service.getNextSong(function(data) {
				data['artistArtUrl'] = data['artistArtUrl'] || "/static/img/noalbumart.png";
				viewModel.json(data);
				viewModel.addHistory(viewModel.json());
		init: function(element, valueAccessor, allBindingsAccessor, viewModel)
		{
			$(element).jPlayer({
				ready: function(event)
				{
					$(this).jPlayer("setMedia", {
						mp3: viewModel.json().audioURL,
					}).jPlayer("play");
				},
				ended: function(event)
				{
					viewModel.updateVM();
				},
				swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
				supplied: "mp3",
				preload: 'auto',
				wmode: 'window',
			});
		});
	}
	
	$(document).ready(function()
	{
		bridge = new Bridge({ apiKey: "//FILL THIS IN" });
		},
		
		bridge.ready(function() {
			viewModel.getStations();
			viewModel.updateVM();
			ko.applyBindings(viewModel, document.head);
			ko.applyBindings(viewModel, document.body);
		});
	});
		update: function(element, valueAccessor, allBindingsAccessor, viewModel)
		{
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
}(jQuery));
