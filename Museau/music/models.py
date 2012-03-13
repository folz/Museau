from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Profile(models.Model):
	authInfo = models.CharField(max_length=128)
	authToken = models.CharField(max_length=128)
	rid = models.CharField(max_length=128)
	lid = models.CharField(max_length=128)
	
	''' TODO: Obviate this '''
	pandora_password = models.CharField(max_length=128)
	
	user = models.ForeignKey(User, unique=True)
	
# Automatically create user profiles on model creation
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		Profile.objects.create(user=instance)
post_save.connect(create_user_profile, sender=User)
