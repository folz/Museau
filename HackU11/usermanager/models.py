from django.db import models
from django.contrib.auth.models import User, UserManager

from settings import SITE_NAME

class UserProfile(models.Model):
	user = models.OneToOneField(User)
	
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
