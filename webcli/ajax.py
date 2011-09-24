import json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect

from webcli.models import *

def do(req, action):
	x = HttpResponse(json.dumps({
		'coverArt': 'http://cont-sjl-2.pandora.com/images/public/amz/8/2/8/3/075678263828_130W_130H.jpg',
		'songUrl': 'http://audio-sjl-t1-1.pandora.com/access/?version=4&lid=37334406&token=CEiEscd51CJfnWtEfJh2Gcp1TqdLZag33lSDYPtglx8t32M%2F2E5IxD5PhjcGq2YIIg6OGHLBun0pbR3q8dHbBRrPGtfiidmwkCJoCyE8HtLErog%2BUxyNPO9d8Flx3wXGESdnq%2FzMBFzUa3hpLKTVQmG7aREX%2B%2FIvWOYppc6whFmKLiEFh0ttbWVBDf0Zd3ORWfrMf4rLGYlg0IHzUR4G%2BdB%2Ba1aC9QPX8IDyJ%2BGmAZEBE8ulvi%2BISo%2B2TcHTwCPTfS8Fgx5YJSueuOF8JHFrfMs0CA6Pop1OCtkDDfeh80RSpw%2FnVKOMPR49eNIY7AElxOPKWtL4TadU3a0ax29tlwQcHIqhRHrb',
	}))
	x['Cache-Control'] = 'no-cache'
	return x

def search(req):
	terms = req.GET.get('searchText')
	print("terms", terms)
	
	return HttpResponse(json.dumps(terms));
