from django.db import models
from django.contrib.auth.models import User, UserManager

from settings import SITE_NAME

class UserProfile(models.Model):
	user = models.OneToOneField(User)
	
	pandora_username = models.CharField(max_length=64)
	pandora_password = models.CharField(max_length=64)

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
