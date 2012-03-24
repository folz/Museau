from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

	# Museau
	
	url(r'^$', 'music.views.home', name='home'),
	
	
	# django-registration
	
	url(r'^accounts/', include('registration.urls')),
	
	url(r'^accounts/profile/$', 'music.views.back_to_home', name='redir'),
	
	
	# Django Admin
	
	url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
	
	url(r'^admin/', include(admin.site.urls)),
)
