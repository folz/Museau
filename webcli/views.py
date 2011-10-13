from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from webcli.models import *
from webcli.forms import *

def index(req, login_form=LoginForm(), register_form=RegisterForm()):
	if req.user.is_authenticated():
		return render_to_response('home.html', {
			'title': SITE_NAME,
		}, context_instance=RequestContext(req))
	
	if req.method == 'POST':
		logform = LoginForm(req.POST)
		regform = RegisterForm(req.POST)
		
		if logform.is_valid():
			user = authenticate(username=logform.cleaned_data['username'], password=logform.cleaned_data['password'])
			if user:
				login(req, user)
		elif regform.is_valid():
			if User.objects.filter(username=regform.cleaned_data['username']).exists():
				pass
			else:
				user = User.objects.create_user(regform.cleaned_data['username'], email='', password=regform.cleaned_data['password'])
				user.save()
				user = authenticate(regform.cleaned_data['username'], password=regform.cleaned_data['password'])
				login(req, user)
				messages.add_message(req, messages.SUCCESS, "Welcome to {0}!".format(SITE_NAME))
				pass
		return HttpResponseRedirect('/')
	else:
		return render_to_response('index.html', {
			'title': "Welcome to {0}".format(SITE_NAME),
			'login_form': login_form,
			'register_form': register_form,
		}, context_instance=RequestContext(req))

@login_required
def user_logout(req):
	logout(req)
	return HttpResponseRedirect('/')
