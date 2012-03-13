from django.contrib.auth import authenticate, login as login_user, logout as logout_user
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, redirect
from django.template import RequestContext

from models import *
from forms import *

import random

@login_required
def home(req):
	return render(req, 'home.html', locals())

def back_to_home(req):
	# Maps accounts/profile back to home (we don't use it)
	return redirect('home')
