import os
import urllib2

from connection import PandoraConnection

# TODO:
# * Delete stations.
# * Love/Ban (arbitrary?) songs.

def authenticated(f):
	def check_authentication(self, *args):
		if not self.is_authenticated:
			raise ValueError("User not yet authenticated")

		return f(self, *args)
	return check_authentication

class Pandora(object):
	stationId = None
	is_authenticated = False
	backlog = []

	def __init__(self):
		self.connection = PandoraConnection()

	def authenticate(self, username, password):
		self.is_authenticated = self.connection.authListener(username, password)
		return self.is_authenticated
	
	def set_tokens(self, authInfo="", authToken="", rid="", lid=""):
		''' TODO: The start of an attempt to not store pandora passwords in plaintext '''
		self.authInfo = result
		self.authToken = self.authInfo["authToken"]
		self.lid = self.authInfo["listenerId"]
		return True

	@authenticated
	def getStationList(self):
		return self.connection.getStations()

	@authenticated
	def switchStation(self, stationId):
		if type(stationId) is dict:
			stationId = stationId['stationId']

		self.stationId = stationId
		self.backlog = self.connection.getFragment(stationId)

	@authenticated
	def getNextSong(self):
		if not self.stationId:
			raise ValueError("No station selected")

		if len(self.backlog) < 2:
			self.backlog.extend(self.connection.getFragment(self.stationId))

		return self.backlog.pop()

	@authenticated
	def searchMusic(self, query):
		return self.connection.findMusicIds(query)

	@authenticated
	def createStation(self, musicId):
		return self.connection.createStation(musicId)

if __name__ == "__main__":
	api = Pandora()
	api.authenticate(raw_input("Username: "), raw_input("Password: "))

	print "\t", "Stations:"
	for station in api.getStationList():
		if station['isQuickMix']:
			quickmix = station
		print "\t", station['stationName']

	api.switchStation(quickmix)
	while True:
		song = api.getNextSong()
		print "[Pandora] {0} - {1}".format(song['artistSummary'], song['songTitle'])
		print song['audioURL']
		if not input("Fetch another song? [True/False]: "):
			break

	query = raw_input("Search for music on Pandora: ")
	results = api.searchMusic(query)
	print "Here's what Pandora found for your query: '{0}'".format(query)
	print "\t", "Artists"
	for artist in results['artists']:
		print "\t"*2, artist['artistName']
	print "\t", "Songs"
	for song in results['songs']:
		print "\t"*2, song['songTitle'], "by", song['artistSummary']

	print "Let's create a new station from your search results."
	stations = [station['stationName'] for station in api.getStationList()]
	for artist in results['artists']:
		if artist['artistName'] not in stations:
			api.createStation(artist['musicId'])
			print "Done! Look for {0} radio on Pandora.".format(artist['artistName'])
			break
