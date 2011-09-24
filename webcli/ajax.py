import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from webcli.models import *

def do(req, action):
	x = HttpResponse(json.dumps({
		'coverArt': 'http://cont-sjl-1.pandora.com/images/public/amz/2/2/5/2/074646772522_130W_130H.jpg',
		'songUrl': 'http://audio-sv5-t1-2.pandora.com/access/?version=4&lid=37334406&token=SWs3mgt8A3%2FW3hG7Hks9HqDAqmAxiqmS5zNpFoKsSFKM2wXnHR9bsHaedfoNJGSC8JKVS3UzyGVqvCXAlME7qNmILu1sDWP0fjN%2Bmc63kDmVgTpWCqX6CBIOLDS4C1975gPRS7FmEsx3nZRJ%2FtfuPNh1qkiiMQzxss9R93rkR0ZiGeDpBL4NRqAgK67slWLyYlSyxBruvXVtMHgQC7wLhz9X3T56QjTlgJh3tbJ7vfJmuTMp0Hm3iRHTpAmIFWJLqO9XYvArdn5aWOmJFKIPTscMUfhdFfOb4ctlNgFYoNMFWhxCnsKbcHRvKD7HD42UNMdCsBVyDS5tO8HLhl%2Fzbg%3D%3D',
		'seekTime': 0
	}))
	x['Cache-Control'] = 'no-cache'
	return x

def search(req):
	terms = req.GET.get('searchText')
	print("terms", terms)
	
	return HttpResponse(json.dumps(terms));
