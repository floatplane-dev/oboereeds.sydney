# How to set up a Debian 10 server

# ----------

# DIGITAL OCEAN

# 1. Create droplet
# 2. Add your local public SSH key during creation
cat ~/.ssh/id_rsa.pub
# 3. Configure DNS A-record to point to IP of new droplet

# ----------

# CREATE YOUR USER

ssh root@1.2.3.4
sudo adduser rv
# Religiously store your 64 random character password in 1Password
sudo gpasswd -a rv sudo
groups rv
su - rv
# On your local run:
cat ~/.ssh/id_rsa.pub
# Copy the output
# On the remote run:
mkdir ~/.ssh
vim ~/.ssh/authorized_keys
# Paste your local's public key here, save
touch ~/.hushlogin
logout
ssh rv@1.2.3.4
# Should log you in
# No welcome message is shown

# ----------

# LOCK DOWN ROOT USER

sudo vim /etc/ssh/sshd_config
# PasswordAuthentication no
# PermitRootLogin no
# Save
# disables username/pw forces only ssh key login

sudo service ssh restart
logout
ssh root@1.2.3.4
# Should fail
ssh rv@1.2.3.4
# Should work

# ----------

# INSTALL GIT

sudo apt update
sudo apt install git

# ----------

# INSTALL FISH

sudo wget -nv https://download.opensuse.org/repositories/shells:fish:release:3/Debian_9.0/Release.key -O Release.key
sudo apt-key add - < Release.key
sudo apt-get update
sudo apt-get install fish
chsh -s /usr/bin/fish
fish
# Should show fish greeting

sudo apt install curl
curl -L https://get.oh-my.fish | fish
omf install lambda
# Should show you Lambda theme
set fish_greeting

# the lambda theme has a bug...
# https://github.com/hasanozgan/theme-lambda/issues/11
# the author has not yet merged in the fix
# temporary fix:
# curl -o ~/.config/fish/functions/fish_right_prompt.fish https://raw.githubusercontent.com/js402882/theme-lambda/duration-in-right-prompt/fish_right_prompt.fish

logout
ssh rv@1.2.3.4
# Fish should be your default shell
# No Fish welcome message should be shown

# ----------

# FIREWALL

sudo apt install ufw
sudo ufw status verbose
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status verbose
# Needs reboot, see next step

# ----------
# RENAME SERVER
# OPTIONAL!

sudo vim /etc/hostname
# Update server name if needed"
sudo vim /etc/hosts
# Update 127.0.0.1 to same name

# ----------
# RESTART SERVER

sudo reboot
# Wait 10 sec
ssh rv@1.2.3.4
# Should show new server name (if you set one)

# ----------

# PROJECT DIRECTORY

# Create folder for projects (www) and the git repos (repo).
sudo mkdir /var/www/
# Give the deploy group read and write access to the project folders.
sudo chown -R rv:rv /var/www/ # sudo chown -R rv:[group name, eg: deploy] /var/www/
sudo chmod -R g+w /var/www/
# Make sure these permissions are inherited when future files and folders are created within.
sudo chmod -R g+s /var/www/
# Verify your user is the owner of `./` and you have `drwxr-sr-x` permissions (not `drwxr-xr-x`)
ls -la /var/www/

# ----------

# CREATE SSH KEY

# to allow the server to talk to github (it needs it's own identity)
# Without password, with custom file name
# ssh-keygen -t rsa -b 4096 -C "cdn@server.interflux.com" -f ~/.ssh/rsa_cdn -P ""
ssh-keygen -t rsa -b 4096 -C "www@server.interflux.com" -f ~/.ssh/rsa_www -P ""
# ssh-keygen -t rsa -b 4096 -C "api@server.interflux.com" -f ~/.ssh/rsa_api -P ""

# Copy each each public key to their respective Github repos
# Add as deploy keys under the repo settings
# cat ~/.ssh/rsa_cdn.pub
cat ~/.ssh/rsa_www.pub
# cat ~/.ssh/rsa_api.pub

# just once we clone git in to this server
env GIT_SSH_COMMAND='ssh -i ~/.ssh/rsa_floatplane.dev' git clone git@github.com:floatplane-dev/floatplane.dev.git

# bash
# GIT_SSH_COMMAND='ssh -i ~/.ssh/rsa_floatplane.dev' git clone git@github.com:floatplane-dev/floatplane.dev.git
# GIT_SSH_COMMAND='ssh -i ~/.ssh/rsa_cdn' git clone git@github.com:janwerkhoven/cdn.interflux.com.git
# GIT_SSH_COMMAND='ssh -i ~/.ssh/rsa_api' git clone git@github.com:janwerkhoven/api.interflux.com.git
# fish

cd /var/www/cdn.interflux.com
git config core.sshCommand "ssh -i ~/.ssh/rsa_cdn -F /dev/null" #configure git to use this rsa key for this folder from now on
git pull

cd /var/www/www.interflux.com
git config core.sshCommand "ssh -i ~/.ssh/rsa_www -F /dev/null"
git pull

# The Rails API is slightly different (see later chapters)

# ----------

# NVM, NODE and YARN

# Inside the project, assuming it has `.nvmrc` in the root, run:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
omf install nvm
nvm ls-remote --lts
nvm list
nvm install v10.16.3
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
yarn -v

# ----------

# CLONE, INSTALL and BUILD PROJECT

# We assume your project has `.nvmrc`
# We assume your project has `yarn.lock` and `package.json`
cd /var/www/
git clone git@github.com:janwerkhoven/www.interflux.com.git
cd www.interflux.com
git checkout production
nvm install
yarn install
yarn build

# ----------

# DEPLOY PIPELINE

# Add `deploy.sh` to your project:
# Add `install.sh` to your project:
# Add these scripts to `package.json`

# "scripts": {
#   "start": "./node_modules/.bin/gulp serve",
#   "build": "./node_modules/.bin/gulp build",
#   "deploy": "git checkout production -f; git pull origin master; git push; ./deploy.sh; git checkout master",
#   "bump-patch": "npm version patch; git push origin --tags; git push",
#   "bump-minor": "npm version minor; git push origin --tags; git push",
#   "bump-major": "npm version major; git push origin --tags; git push"
# }

# Deploy to remote!

yarn deploy

# ----------

# NGINX

# Install
sudo apt update
sudo apt install nginx
# Open the firewall for Nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw status verbose
sudo reboot
# Wait 10 sec
ssh rv@1.2.3.4

# Become owner of `sites-available` for easier editing
sudo chown -R rv:rv /etc/nginx/sites-available/
chmod -R g+s /etc/nginx/sites-available/

# Check whether the server blocks are valid:
sudo nginx -t

# Start Nginx:

sudo systemctl start nginx

# You should now see the default Nginx page:

http://server.interflux.com/

# Managing Nginx:

sudo systemctl status nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl stop nginx

# ----------

# CERTBOT

sudo apt-get install certbot python-certbot-nginx

# Managing
sudo certbot certonly --nginx
sudo certbot renew --dry-run
sudo certbot renew

# Certificates expire each 3 months, for automation add the command here:
/etc/crontab/
/etc/cron.*/*
systemctl list-timers

# Testing
https://www.ssllabs.com/ssltest/.

# ----------

# GO LIVE

# On your local, add Nginx config files to your repo
# Add `nginx.conf`
# Add `nginx.temp.conf`
yarn deploy

# On the remote, enable the temporary Nginx config
sudo ln -nsf /var/www/www.interflux.com/remote/nginx.setup.conf /etc/nginx/sites-enabled/www.interflux.com.conf
sudo ln -nsf /var/www/floatplane.dev/remote/nginx.setup.conf /etc/nginx/sites-enabled/floatplane.dev.conf
# Test the config, should pass
sudo nginx -t

# Run Certbot twice, once www and once for non-www
sudo certbot certonly --nginx
sudo certbot certonly --nginx

# Enable the production config, test, should pass
sudo ln -nsf /var/www/www.interflux.com/remote/nginx.conf /etc/nginx/sites-enabled/www.interflux.com.conf
sudo nginx -t

# If all good, restart Nginx
sudo systemctl restart nginx
sudo systemctl status nginx

# Check your website, should be live and redirect HTTP to HTTPS
www.interflux.com

# ----------

# RUBY, RBENV

# Install missing packages for compiling Ruby
sudo apt-get install -y build-essential libssl-dev libreadline-dev zlib1g-dev

# Install Rbenv for managing Ruby versions
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
set -Ux fish_user_paths $HOME/.rbenv/bin $fish_user_paths
set -Ux fish_user_paths $HOME/.rbenv/shims $fish_user_paths
rbenv -v
ruby -v
gem -v

# Install the rbenv plugins `ruby-build` and `rbenv-vars`:
mkdir ~/.rbenv/plugins
cd ~/.rbenv/plugins
git clone https://github.com/rbenv/ruby-build.git
git clone https://github.com/rbenv/rbenv-vars.git

# Set a default Ruby version at user root
echo "2.6.5" >> ~/.ruby-version
rbenv install
ls -la /home/rv/.rbenv/versions/
du -sh /home/rv/.rbenv/versions/*
ruby  -v
gem -v

# ----------

# POSTGRESQL

# https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

sudo apt update
sudo apt install -y postgresql postgresql-contrib libpq-dev

# Switch to the new user `postgres` and create a new Postgress role for the project:

sudo -u postgres createuser -s interflux

# Now use user `postgres` to open Postgres:

sudo -u postgres psql

# Set a password for the new role:

\password interflux
[Choose password]
[Repeat]
\q

# ----------

# RAILS

# Create all directories

cd /var/www
mkdir api.interflux.com
cd api.interflux.com
mkdir repo
mkdir logs
mkdir pids
mkdir sockets
mkdir builds

# Initialise Git

cd repo
git init --bare
git remote add origin git@github.com:interflux-electronics/api.interflux.com.git
git config core.sshCommand "ssh -i ~/.ssh/rsa_api -F /dev/null"
git fetch

# ----------

# RAILS SECRETS, RBENV-VARS

# On your remote add 3 secrets to the root of the project
cd /var/www/api.interflux.com
vim .rbenv-vars

'
DB_USER=[the postgres role created earlier]
DB_PASSWORD=[the postgres password set earlier]
SECRET_KEY_BASE=[choose random secret]
rvT_SECRET=[choose random secret]
'

# Make sure you store SECRET_KEY_BASE and rvT_SECRET in 1Password

# Check if Rbenv can read them:

rbenv vars

# On your local:
# Make sure DB_USER matches the one found in `config/secrets.yml`
# Make sure DB_PASSWORD matches the one found in `config/database.yml`

# ----------

# DEPLOY THE API

# We'll assume the repo has:
# `.ruby-version`
# `remote/deploy.sh` and is executable by the user
# `remote/install.sh` and is executable by the user
# `remote/nginx.conf`
# `remote/nginx-setup.conf`

remote/deploy.sh

# ----------

# EMBER FASTBOOT

# Install the following packages to your Ember project:

ember install ember-cli-fastboot
yarn add -D fastboot-app-server
yarn add -D fastboot-watch-notifier
yarn add -D ember-fetch

# Make sure to remove all jQuery from your app (breaks in Fastboot). Also guard
# all calls to `window` related properties (breaks). Fastboot is run in Node and
# does not have a window to refer to. Example of guard:

```
persistToken() {
  if (this.isFastBoot) {
    return;
  }
  // Will run in the browser, will not run on your server.
  window.localStorage.setItem('token', this.token);
},
```

# Edit the Nginx config

server
{
  ...

  location /assets/
  {
    expires 30d;
    proxy_pass http://0.0.0.0:8000;
  }

  location /
  {
    expires -1;
    proxy_pass http://0.0.0.0:8000;
  }
}

# Add `fastboot-server.js` in project root:
# Don't forget to update distPath and port!

```
/*eslint-env node*/

const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const distPath = '/var/www/lmpa.interflux.com/dist';

const notifier = new FastBootWatchNotifier({
  distPath,
  debounceDelay: 250,
  saneOptions: {
    poll: true
  }
});

const server = new FastBootAppServer({
  distPath,
  notifier,
  gzip: true,
  host: '0.0.0.0',
  port: 8000
});

server.start();
```

# Add `remote/systemd.service` which will deamonize Fastboot for us:
# Update the paths. Respect the dots and dashes format!

```
[Unit]
Description=This service starts and stops the Ember Fastboot app server for lmpa.interflux.com.

[Service]
WorkingDirectory=/var/www/lmpa.interflux.com
ExecStart=/home/rv/.nvm/versions/node/v8.12.0/bin/node server.js
Type=simple
User=rv
Group=rv
# StandardOutput=file:/var/log/fastboot/lmpa-interflux-com.access.log
# StandardError=file:/var/log/fastboot/lmpa-interflux-com.error.log

[Install]
WantedBy=multi-user.target
```

# On the remote, copy the service file:

sudo cp /var/www/lmpa.interflux.com/remote/systemd.service /etc/systemd/system/fastboot.lmpa-interflux-com.service

# Double check it's there:

ls -la /etc/systemd/system/

# Create folder for logs (if applicable):

sudo mkdir -p /var/log/fastboot

# Enable and start the service:

sudo systemctl enable fastboot.lmpa-interflux-com.service
sudo systemctl start fastboot.lmpa-interflux-com.service
sudo systemctl status fastboot.lmpa-interflux-com.service

# Each time you edit the service file:

sudo systemctl daemon-reload

# Test. Should return rich HTML and files:

curl http://0.0.0.0:8000
curl http://0.0.0.0:8000/robots.txt
curl http://0.0.0.0:8000/sitemap.xml

# Yea? Have a beer!

# Now stub Nginx, get SSL and go live!
