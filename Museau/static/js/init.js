;(function($, undefined) {
	var ViewModel;
	var Song;
	
	var bridge;
	var pandora;
	var vm;
	
	Song = (function() {
		
		function Song(data) {
			this.data = data;
		}
		
		Song.prototype.toString = function() {
			return "" + this.data.songTitle + " by " + this.data.artistSummary + " on " + this.data.albumTitle;
		};
		
		Song.prototype.url = function() {
			return "" + this.data.audioURL;
		};
		
		Song.prototype.albumArt = function() {
			return "" + this.data.artistArtUrl;
		};
		
		return Song;
	})();
	
	ViewModel = (function() {
		
		function ViewModel() {
			this.currentStation = ko.observable({});
			this.stations = ko.observableArray([]);
			
			this.currentSong = ko.observable(new Song({}));
			this.history = ko.observableArray([]);
			
			this.songUrl = ko.computed(function() {
				return this.currentSong().url();
			}, this);
			
			this.albumArt = ko.computed(function() {
				return this.currentSong().albumArt();
			}, this);
					
			this.quickMix = ko.computed(function() {
				return ko.utils.arrayFilter(this.stations(), function(item) {
					return item['isQuickMix'];
				})[0];
			}, this);
		};
		
		ViewModel.prototype.forceUpdateHistory = function(song) {
			this.currentSong(song);
			this.history.remove(song)
			this.history.unshift(song);
		};
		
		ViewModel.prototype.nextSong = function() {
			var self = this;
			
			$("#jquery_jplayer_1").jPlayer("pause");
			pandora.getNextSong(function(data) {
				data['artistArtUrl'] = data['artistArtUrl'] || "/static/img/noalbumart.png";
				
				var song = new Song(data);
				self.forceUpdateHistory(song);
			});
		};
		
		ViewModel.prototype.switchStation = function(data) {
			var self = this;
			
			console.log("Switching to ", data['stationName']);
			pandora.switchStation(data, function() {
				//this.currentStation(data);
				self.nextSong();
			});
		};
		
		return ViewModel;
	})();
	
	ko.bindingHandlers.jPlayer = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			$(element).jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						mp3: viewModel.currentSong().audioURL,
					}).jPlayer("play");
				},
				ended: function(event) {
					viewModel.nextSong();
				},
				swfPath: "http://www.jplayer.org/2.1.0/js/Jplayer.swf",
				supplied: "mp3",
				preload: 'auto',
				wmode: 'window',
			});
		},
		
		update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
			console.log("jPlayer updated! Now playing "
						+ viewModel.currentSong() + " at URL "
						+ viewModel.currentSong().url());
			$(element).jPlayer("clearMedia").jPlayer("setMedia", {
				mp3: viewModel.currentSong().url()
			}).jPlayer("play");
		}
	};
	
	$(document).ready(function() {
		vm = new ViewModel();
		window.vm = vm;
		
		ko.applyBindings(vm);
		
		bridge = new Bridge({ apiKey: "// FILL IN" });
		console.debug("Bridge is initialized");
		
		bridge.ready(function() {
			
			console.debug("Bridge is ready");
			bridge.getService("pandora", function(service) {
				
				console.debug("Got pandora service");
				pandora = service;
				
				pandora.getStationList(function(data) {
					
					vm.stations(data);
					vm.switchStation(vm.quickMix());
				});
			});
		});
	});

})(jQuery);
