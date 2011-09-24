// Coded by Hayg Astourian
// General Message Queue management functions
// For HackU hackathon!

#define BUF_SIZE 1024

#include <mqueue.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char name[] = "/mqz";
int mq = -1;


void print_buf(char * buf, int size)
{
	for(int i = 0; i < size; i++)
	{
		putchar(buf[i]);
	}
	// cout << '\n';
}

int mq_openR()
{
	//cout << "In openR\n";
	mq = mq_open(name, O_RDWR);
	if(mq == -1)
	{
        perror("Mq_open failed");
        exit(EXIT_FAILURE);
	}
	return mq;
}

void mq_openRW()
{
	//cout << "In openRW\n";
	mq_attr attr;
	attr.mq_maxmsg = 10;
	attr.mq_msgsize = BUF_SIZE;
	attr.mq_flags = 0;
	attr.mq_curmsgs = 0;

	mq = mq_open(name, O_CREAT|O_RDWR, S_IRUSR|S_IWUSR|S_IROTH|S_IWOTH, &attr);
	//cout << "MQ is " << mq << '\n';
	if(mq == -1)
	{
        perror("Mq_open failed");
        exit(EXIT_FAILURE);
	}
}

// sends data in buf of length size
void mq_add(char * buf)
{
	mq = mq_openR();
	if(mq == -1)
	{
		//cout << "MQ is not initialized\n";
	}
	else
	{
		int numSent = mq_send(mq, buf, BUF_SIZE, 0);
		if(numSent == -1)
		{
			perror("Mq_send failed");
		}else{
			//cout << buf << '\n';
		}
	}
}

// populates buf with the data on the message queue of length size
void mq_take(char * buf)
{
	mq = mq_openR();
	if(mq == -1)
	{
		//cout << "MQ is not initialized\n";
	}
	else
	{
		int numRecved = mq_receive(mq, buf, BUF_SIZE, NULL);
		print_buf(buf, BUF_SIZE);
		//cout << size << '\n';
		if(numRecved == -1)
		{
			perror("Mq_receive failed!");
		}else{
			//cout << buf << '\n';
		}
	}
}

// clean up
void mq_destroy()
{
	mq = mq_openR();
	if(mq == -1) {
		//cout << "MQ is not initialized\n";
	} else {
		if(mq_close(mq) == -1 || mq_unlink(name) == -1)
			perror("Mq_close or unlink failed");
		else {
			//cout << "MQ was closed and unlinked.\n";
		}
	}
}

int main(int argc, char *argv[])
{
	char buf[BUF_SIZE];
	memset(buf, 0, BUF_SIZE);

	char str_value0[] = "0";
	char str_value1[] = "1";
	char str_value2[] = "2";
	char str_value3[] = "3";

	int offset = 0;
	if(argc > 1)
	{
		for(int i = 2; i < argc; i++)
		{
			memcpy(buf + offset, argv[i], strlen(argv[i]));
			//print_buf(buf, BUF_SIZE);
			offset += strlen(argv[i]) + 1;
		}

		if(strcmp(argv[1], str_value0) == 0)
		{
			mq_openRW();
		}else{
			if(strcmp(argv[1], str_value1) == 0)
			{
				//cout << "In add!\n";
				mq_add(buf);
			}
			else{
				if(strcmp(argv[1], str_value3) == 0)
				{
					mq_destroy();
				}else{
					//cout << "In take!\n";
					memset(buf, 0, BUF_SIZE);
					mq_take(buf);
					}
				}
			}
	}else{
		//cout << "Usage: Function Code(0: createRW, 1: add, 2: take)"
			// << ", message for add.\n";
	}

	return 0;
}
