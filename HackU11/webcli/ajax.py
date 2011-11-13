import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from webcli.models import *
from python_pandora import pandora

from django.conf import settings

@login_required
def do(req, action, filetype):
	actions = {
		'next_song': get_next_song,
		'search': search,
	}
	
	return actions[action](req, filetype)

def get_next_song(req, filetype):
	api = pandora.Pandora()
	username = req.user.username
	password = req.user.get_profile().pandora_password
	
	if api.authenticate(username, password):
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
	else:
		return HttpResponse(json.dumps({
			'error': 'authentication failed'
		}))

def search(req, filetype):
	terms = req.GET.get('searchText')
	
	return HttpResponse(json.dumps(terms));
