from django.conf.urls.defaults import patterns, include, url
from django.conf import settings


# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	# Examples:
	url(r'^$', 'webcli.views.index', name='index'),
	
	url(r'^logout/$', 'webcli.views.user_logout', name='logout'),
	
	url(r'^ajax/(?P<action>.*)/$', 'webcli.ajax.do'),
	
	url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
	url(r'^admin/', include(admin.site.urls)),
)
