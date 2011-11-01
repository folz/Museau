from django import forms

class RegisterForm(forms.Form):
	username = forms.CharField(max_length=16)
	password = forms.CharField(widget=forms.PasswordInput())

class LoginForm(forms.Form):
	username = forms.CharField()
	password = forms.CharField(widget=forms.PasswordInput())

class PandoraForm(forms.Form):
	pandora_username = forms.CharField(max_length=128)
	pandora_password = forms.CharField(max_length=128)
