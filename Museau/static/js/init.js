;(function($, undefined)
{
	var bridge;
	var viewModel;
	
	$(document).ready(function()
	{
		viewModel = new ViewModel()
		ko.applyBindings(viewModel);
		
		bridge = new Bridge({ apiKey: "// FILL IN" });
		
		bridge.ready(function()
		{
			bridge.getService("pandora", function(service)
			{
				service.getStationList(function(data)
				{
					viewModel.stations(data);
					
					service.switchStation(viewModel.quickMix(), function()
					{
						viewModel.updateVM();
					});
				});
			});
		});
	});
	
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
		}
	}
	
	ko.bindingHandlers.jPlayer =
	{
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
		},
		
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
