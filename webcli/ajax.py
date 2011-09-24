import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from webcli.models import *

def do(req, action):
	x = HttpResponse(json.dumps({
		'coverArt': 'http://cont-sjl-2.pandora.com/images/public/amz/2/2/7/1/075679041722_130W_130H.jpg',
		'songUrl': "http://audio-ash-t1-2.pandora.com/access/?version=4&lid=37334406&token=5QGAQ%2FNONzcAg1RWt7eNtqizOropgdcnENo9gpWsTObttyx0E5v00AV1%2F6VEqE70oDjUmMIo7Ev5b8%2BQD1ape%2BDcbabd3rf5IIgm0I3L%2FmayCelVZ4IEBE3H%2Bc0LKM7mra2sAVXS3deHpuJ6RK%2Fhl32AB1iC5d5pTonOtby6nrK2S1a9Ii5Xq6WdhGOBCMf2hrtSL5rfCwCLQmINF5LuICs7jySLipxOiVGVb8bvk8F8z3l0ON6TjJlavXUsiS20nGVXrdOsviPCE4vA%2B38K0qBW4flL2%2BL03paNqgmD8GapboOshrf87T0kcb5pBp%2BbEsbeE9nj3ih2dcV8gk7DYA%3D%3D",
		'seekTime': 0
	}))
	x['Cache-Control'] = 'no-cache'
	return x
