import time
import urllib2
import xmlrpclib

import crypt

class AuthenticationError(Exception):
	"""Raised when an operation encountered authentication issues."""
	pass

class PandoraConnection(object):
	rid = ""
	lid = ""
	authInfo = {}
	authToken = ""

	PROTOCOL_VERSION = 33
	BASE_URL = "https://www.pandora.com/radio/xmlrpc/v%d?" % PROTOCOL_VERSION
	BASE_URL_RID = BASE_URL + "rid=%sP&method=%s"
	BASE_URL_LID = BASE_URL + "rid=%sP&lid=%s&method=%s"

	def __init__(self):
		self.rid = "%07i" % (time.time() % 1e7)

	def authListener(self, user, pwd):
		reqUrl = self.BASE_URL_RID % (self.rid, "authenticateListener")

		try:
			result = self.doRequest(reqUrl, "listener.authenticateListener", user, pwd)
		except:
			return False

		self.authInfo = result
		self.authToken = self.authInfo["authToken"]
		self.lid = self.authInfo["listenerId"]
		return True

	def getStations(self):
		reqUrl = self.BASE_URL_LID % (self.rid, self.lid, "getStations")
		return self.doRequest(reqUrl, "station.getStations", self.authToken)

	def findMusicIds(self, search):
		'''Returns a dictionary or artists and songs related to the search.'''
		reqUrl = self.BASE_URL_RID % (self.rid, "search")
		return self.doRequest(reqUrl, "music.search", self.authToken, search)

	def createStation(self, musicId):
		'''Create a station using a musicId. You can get a musicId using findMusicIds.'''
		reqUrl = self.BASE_URL_RID % (self.rid, "createStation")
		return self.doRequest(reqUrl, "station.createStation", self.authToken, "mi" + musicId, "")

	def deleteStation(self, switchTo=None):
		'''Switches stations then deletes the old one.'''
		pass

	def rateSong(self, songId, love=True, station=None):
		'''Assign this song a love/ban rating (given the station).'''
		pass

	def getFragment(self, stationId=None, encoding="mp3"):
		reqUrl = self.BASE_URL_LID % (self.rid, self.lid, "getFragment")
		songlist = self.doRequest(reqUrl, "playlist.getFragment", self.authToken, stationId, "0", "", "", encoding, "0", "0")

		for i in range(len(songlist)):
			url = songlist[i]["audioURL"]
			url = url[:-48] + crypt.decryptString(url[-48:])[:-8]
			songlist[i]["audioURL"] = url

		self.curStation = stationId
		self.curFormat = encoding

		return songlist

	def sync(self):
		reqUrl = self.BASE_URL_RID % (self.rid, "sync")

		req = xmlrpclib.dumps((), "misc.sync").replace("\n", "")
		enc = crypt.encryptString(req)

		u = urllib2.urlopen(reqUrl, enc)
		resp = u.read()
		u.close()

	def doRequest(self, reqUrl, method, *args):
		args = (int(time.time()), ) + args
		req = xmlrpclib.dumps(args, method).replace("\n", "")
		enc = crypt.encryptString(req)

		u = urllib2.urlopen(reqUrl, enc)
		resp = u.read()
		u.close()

		try:
			parsed = xmlrpclib.loads(resp)
		except xmlrpclib.Fault, fault:
			print "Error:", fault.faultString
			print "Code:", fault.faultCode
			print "Response:", resp

			code = fault.faultString.split("|")[-2]
			if code == "AUTH_INVALID_TOKEN":
				raise AuthenticationError()
			else:
				raise ValueError(code)

		return parsed[0][0]
