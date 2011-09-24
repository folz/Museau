from django import forms
from django.db import models
from django.contrib.auth.models import User, UserManager

class TuneUser(User):
	pandora_username = models.CharField(max_length=128)
	pandora_password = models.CharField(max_length=128)

class RegisterForm(forms.Form):
	username = forms.CharField(max_length=16, label="Username")
	password = forms.CharField(widget=forms.PasswordInput(), label="Password")

class LoginForm(forms.Form):
	username = forms.CharField(label="Username")
	password = forms.CharField(label="Password", widget=forms.PasswordInput())
