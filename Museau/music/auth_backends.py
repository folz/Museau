from django.conf import settings
from django.contrib.auth.models import User, check_password

from pandora import pandora

class PandoraBackend(object):
	"""
	
	Authenticate against Pandora using python-pandora.
	
	"""
	
	supports_inactive_user = False
	
	def authenticate(self, **kwargs):
		api = pandora.Pandora()
		username = kwargs['username']
		password = kwargs['password']
		
		if api.authenticate(username, password):
			print "{0} valid".format(username)
			''' The Pandora credentials are valid. '''
			
			if User.objects.filter(username=username).exists():
				''' This user has logged in here before. '''
				user = User.objects.get(username=username)
			else:
				''' This is the first time the user has logged in. '''
				user = User.objects.create_user(username, username, 'this_password_will_be_disabled')
				user.set_unusable_password() # because we use Pandora for authentication
				user.save()
			
			profile = user.get_profile()
			profile.pandora_password = password
			profile.save()
			
			print user.get_profile().pandora_password
			
			return user
		else:
			return None
	
	def get_user(self, user_id):
		try:
			return User.objects.get(pk=user_id)
		except User.DoesNotExist:
			return None
