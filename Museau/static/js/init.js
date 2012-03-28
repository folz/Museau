;(function($, undefined) {
	var Station;
	var Song;
	var ViewModel;
	
	var bridge;
	var pandora;
	var vm;
	
	var username = prompt("Username");
	var password = prompt("Password");
	
	Station = (function() {
		
		function Station(data) {
			this.data = data;
		}
		
		Station.prototype.toString = function() {
			return "" + this.data.stationName;
		}
		
		Station.prototype.isQuickMix = function() {
			return this.data.isQuickMix;
		}
		
		return Station;
	})();
	
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
			return "" + this.data.artistArtUrl || "/static/img/noalbumart.png";
		};
		
		return Song;
	})();
	
	ViewModel = (function() {
		
		function ViewModel() {
			this.currentStation = ko.observable(new Station({}));
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
					return item.isQuickMix();
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
			pandora.getNextSong(username, function(data) {
				var song = new Song(data);
				self.forceUpdateHistory(song);
			});
		};
		
		ViewModel.prototype.switchStation = function(station) {
			var self = this;
			
			pandora.switchStation(username, station.data, function() {
				self.currentStation(station);
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
		bridge.ready(function() {
			
			bridge.getService("pandora", function(service) {
				
				pandora = service;
				
				pandora.authenticate(username, password, function() {
					pandora.getStationList(username, function(data) {
						
						for (var i = 0, l = data.length; i < l; i++) {
							vm.stations.push(new Station(data[i]));
						}
						
						vm.switchStation(vm.quickMix());
					});
				});
			});
		});
	});

})(jQuery);
