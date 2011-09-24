import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from webcli.models import *

def do(req, action):
	x = HttpResponse(json.dumps({
		'songUrl': "http://audio-sjl-t1-2.pandora.com/access/?version=4&lid=37334406&token=FpHaOio572%2BsJ24iLYXU%2FW4pITGsD2FMXt9YstpVmj7HoXmxQBldxB%2FdnxsNpF9BiRToY9VWt%2Bfe6wd4PR2K8G3%2FUGuGOjIr0AhUFqTC72w4mzx2pS3KpbBhnAFpc%2F8VmG2KddJSXPsVSMzIyE%2BJW4bPFq2S%2FNhJsgL5Iz1bqqEN%2FucE8Is2CL5V2cg7c8uP4re8bGAxQcGjyWOUhgViQX1LOTcyYuD%2BLCD7yIO%2FJUMoL2Yc5DZoX3c6QuNUYYdOLjxv11EOYkAoWg47WGtKND6mKx4iljLQWSyRhrJ4uGTV2dpkK%2BFlNJmC1pDFUCNE5OQIFzeLDqGKdgWVS2XwmQ%3D%3D",
		'seekTime': 0
	}))
	x['Cache-Control'] = 'no-cache'
	return x
