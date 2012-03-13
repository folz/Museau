import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from models import *
from pandora import pandora

@login_required
def do(req, action, filetype):
	actions = {
		'next_song': get_next_song,
		'search': search,
		'stations': get_stations,
	}
	
	api = pandora.Pandora()
	username = req.user.username
	password = req.user.get_profile().pandora_password
	
	if api.authenticate(username, password):
		return actions[action](req, filetype, api)
	else:
		return HttpResponse(json.dumps({
			'error': 'authentication failed'}))

def get_next_song(req, filetype, api):
	# output stations (without QuickMix)
	for station in api.getStationList():
		if station['isQuickMix']: 
			quickmix = station
			break
	
	api.switchStation(quickmix)
	
	next_song = api.getNextSong()
	
	x = HttpResponse(json.dumps(next_song))
	x['Cache-Control'] = 'no-cache'
	return x

def get_stations(req, filetype, api):
	return HttpResponse(json.dumps(api.getStationList()))

def search(req, filetype, api):
	terms = req.GET.get('searchText')
	
	return HttpResponse(json.dumps(terms));
