from django.db import models
from django.contrib.auth.models import User, UserManager

from settings import SITE_NAME

class Room(models.Model):
	pandora_username = models.CharField(max_length=128)
	pandora_password = models.CharField(max_length=128)
	
	users = models.ManyToManyField(User)
