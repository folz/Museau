import os
from multiprocessing import Process, Queue

def getWorkerResponse(q):
	while True:
		stdout_handle = os.popen("./wserv_upload 2", "r")
		command = stdout_handle.read()
		arguments = command.rstrip('\x00\n').split('\0', 10)
		q.put(arguments)

if __name__ == '__main__':
	q = Queue()
	p = Process(target=getWorkerResponse, args=(q,))
	p.start()

	while not q.empty():
		args = q.get()
		print args
