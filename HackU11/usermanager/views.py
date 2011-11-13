from django.contrib.auth import authenticate, login as login_user, logout as logout_user
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext

from usermanager.models import *
from usermanager.forms import *

import random

def index(req, login_form=LoginForm()):
	if req.user.is_authenticated():
		return render_to_response('home.html', {
			'title': SITE_NAME,
			'quote': quote(),
		}, context_instance=RequestContext(req))
	else:
		return render_to_response('index.html', {
			'title': "Welcome to {0}".format(SITE_NAME),
			'login_form': login_form,
			'quote': quote(),
		}, context_instance=RequestContext(req))

def login(req):
	if req.method == 'POST':
		loginform = LoginForm(req.POST)
		
		if loginform.is_valid():
			''' The user entered an email and password. '''
			username = loginform.cleaned_data['email']
			password = loginform.cleaned_data['password']
			
			user = authenticate(username=username, password=password)
			
			if user:
				login_user(req, user)
				messages.add_message(req, messages.SUCCESS, "Welcome to {0}!".format(SITE_NAME))
		else:
			''' We had a failure at some point. Don't tell the user what it was, for Security Reasons. '''
			messages.add_message(req, messages.ERROR, "The username and password combination you entered was incorrect.")
	
	return redirect('index')

@login_required
def logout(req):
	logout_user(req)
	
	return redirect('index')

def quote():
	return random.choice([
		"""Surpass the impossible and kick reason to the curb! That's the Team Gurren way!""",
		"""Whether impossible or laughable, we continue to walk the path of men!""",
		"""Who the hell do you think we are?""",
		"""A true man doesn't die even if he's killed!""",
		"""We evolve beyond the person we were a minute before! Little by little, we advance a bit further with each turn! That's how a drill works!""",
	])
