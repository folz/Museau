from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('', url(r'^$', 'Museau.views.home', name='home'))
