#Setup

## Packages

* python (v2.7.x or any compatible implementation, i.e. pypy)
* python-virtualenv

## Clone the git repository

`git clone git://github.com/folz/Museau.git && cd Museau`

## Set up Virtualenv

Create a [Virtualenv](http://pypi.python.org/pypi/virtualenv):

`$ virtualenv venv --distribute`

> New python executable in ./bin/python
> 
> Installing setuptools............done.


Before running pip (or the application), you’ll need to source the Virtualenv environment:

`$ source venv/bin/activate`

This will change your prompt to include the project name. (You must source the virtualenv environment for each terminal session where you wish to run your app.)

Install dependencies with pip:

`$ pip install -r requirements.txt`

> Downloading/unpacking psycopg2==2.4.2 (from -r requirements.txt (line 2))
> 
> Downloading psycopg2-2.4.2.tar.gz (667Kb): 667Kb downloaded
> 
> Running setup.py egg_info for package psycopg2
> 
>   no previously-included directories found matching 'doc/src/_build'
> 
> Downloading/unpacking Django==1.3 (from -r requirements.txt (line 1))
> 
> Downloading Django-1.3.tar.gz (6.5Mb): 6.5Mb downloaded
> 
> Running setup.py egg_info for package Django
> 
> Installing collected packages: Django, psycopg2
> 
> ...
> 
> Successfully installed Django psycopg2
> 
> Cleaning up...

The `python-pandora` installer is broken, so you'll have to manually
move the files in `venv/pandora/` to `venv/lib/python2.7/site-packages/pandora`:

`$ mv venv/pandora/* venv/lib/python2.7/site-packages/pandora/`

Create the database for the first time:

`$ python Museau/manage.py syncdb`

> Creating tables ...
> 
> Installing custom SQL ...
> 
> Installing indexes ...
> 
> No fixtures found.

Now the Django app should be runnable:

`$ python Museau/manage.py runserver`

> Validating models...
> 
> 
> 
> 0 errors found
> 
> Django version 1.3, using settings 'Museau.settings'
> 
> Development server is running at http://127.0.0.1:8000/
> 
> Quit the server with CONTROL-C.

Open http://127.0.0.1:8000/ in your favorite web browser and enjoy Museau!
