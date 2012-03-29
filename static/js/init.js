;(function($, undefined) {
	var Station;
	var Song;
	var ViewModel;
	
	var bridge;
	var pandora;
	var vm;
	
	var apiKey;
	
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
			this.username = ko.observable("");
			
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
			pandora.getNextSong(apiKey, function(data) {
				var song = new Song(data);
				self.forceUpdateHistory(song);
			});
		};
		
		ViewModel.prototype.switchStation = function(station) {
			var self = this;
			
			pandora.switchStation(apiKey, station.data, function() {
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
		
		var username = prompt("Username");
		var password = prompt("Password");
		
		bridge = new Bridge({ apiKey: "5bffd2de" });
		bridge.ready(function() {
			
			bridge.getService("pandora", function(service) {
				
				pandora = service;
				
				pandora.authenticate(username, password, function(data) {
					if (data) {
						vm.username(username);
						
						apiKey = data;
						pandora.getStationList(apiKey, function(data) {
							
							for (var i = 0, l = data.length; i < l; i++) {
								vm.stations.push(new Station(data[i]));
							}
							
							pandora.currentStation(apiKey, function(data) {
								if (data) {
									var currStation = ko.utils.arrayFilter(vm.stations(), function(item) {
										return item.data.stationId == data;
									})[0];
									
									vm.switchStation(currStation);
								} else {
									vm.switchStation(vm.quickMix());
								}
							});
						});
					} else {
						alert("Authentication failed");
					}
				});
			});
		});
	});

})(jQuery);
