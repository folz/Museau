from django.conf.urls.defaults import patterns, include, url
from django.conf import settings

urlpatterns = patterns('',

	# Museau
	
	url(r'^$', 'Museau.views.home', name='home'),
)
