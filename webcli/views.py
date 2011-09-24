from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from webcli.models import *

def index(req, login_form=LoginForm(), register_form=RegisterForm()):
	if req.method == 'POST':
		logform = LoginForm(req.POST)
		regform = RegisterForm(req.POST)
		
		if logform.is_valid():
			user = authenticate(username=logform.cleaned_data['username'], password=logform.cleaned_data['password'])
			if user:
				login(req, user)
			else:
				messages.add_message(req, messages.ERROR, "Your login information is incorrect. Please try again.")
		elif regform.is_valid():
			if User.objects.filter(username=regform.cleaned_data['username']).exists():
				messages.add_message(req, messages.ERROR, "This username is already in use.")
			else:
				user = User.objects.create(regform.cleaned_data['username'], password=regform.cleaned_data['password'])
				login(req, user)
				messages.add_message(req, messages.SUCCESS, "Welcome to Tuneshare!")
	if req.user.is_authenticated():
		return render_to_response('home.html', {
			'title': "Tuneshare",
		}, context_instance=RequestContext(req))
	else:
		return render_to_response('index.html', {
			'title': "Welcome to Tuneshare",
			'login_form': login_form,
			'register_form': register_form,
		}, context_instance=RequestContext(req))

@login_required
def user_logout(req):
	logout(req)
	messages.add_message(req, messages.SUCCESS, "Until next time, then.")
	return HttpResponseRedirect('/')
