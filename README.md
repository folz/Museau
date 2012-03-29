#Setup

## Prerequisites

* python (v2.7.x or any compatible implementation, i.e. pypy)
* python-virtualenv
* pip

## Clone the git repository

`git clone git://github.com/folz/Museau.git && cd Museau`

## Set up Virtualenv

Create a [Virtualenv](http://pypi.python.org/pypi/virtualenv):

`$ virtualenv venv --distribute`

> New python executable in venv/bin/python
> 
> Installing distribute...............done.
> 
> Installing pip...............done.

To activate the new environment, you’ll need to source it:

`$ source venv/bin/activate`

This will change your prompt to include the project name. (You must source the virtualenv environment for each terminal session where you wish to run your app.)

Install dependencies with pip:

`$ pip install -r requirements.txt`

> Downloading/unpacking tornado==2.2 (from -r requirements.txt (line 5))
> 
>   Downloading tornado-2.2.tar.gz (330Kb): 330Kb downloaded
> 
>   Running setup.py egg_info for package tornado
> 
> [...]
> 
> Successfully installed FlotypeBridge gunicorn python-pandora tornado
> 
> Cleaning up...


Now the app should be runnable:

`$ python server.py`

and in a different terminal:

`$ python app.py`

Open http://127.0.0.1:8000/ in your favorite web browser and enjoy Museau!
