from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

	# User logins and logouts
	url(r'^$', 'usermanager.views.index', name='index'),
	url(r'^login$', 'usermanager.views.login', name='login'),
	url(r'^logout$', 'usermanager.views.logout', name='logout'),
	
	# Ajax requests
	url(r'^ajax/(?P<action>.*)$', 'webcli.ajax.do'),
	
	# Django admin
	url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
	url(r'^admin/', include(admin.site.urls)),

)
