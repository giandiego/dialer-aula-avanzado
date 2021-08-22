# REST API BASE / Node - Mongoose

This project is a REST API BASE. 
Developed using:
* Nodejs
* Express
* Mongodb
* Mongoose
* Babel (ES6+)

Frontend application.

# Endpoints

[Doc](https://documenter.getpostman.com/view/12373830/TzzDKEuh)

# Install

``Requires installing git, nodejs, npm and pm2``

Install MongoDB

Create a /etc/yum.repos.d/mongodb-org-4.4.repo file so that you can install MongoDB directly using yum:

```
vim /etc/yum.repos.d/mongodb-org-4.4.repo
```

```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

Install
```
sudo yum install -y mongodb-org
```


Verify that MongoDB has started successfully and enable
```
sudo systemctl enable mongod
sudo systemctl start mongod
sudo systemctl status mongod
```


Clone project
```
cd /opt/
git clone https://github.com/giandiego/dialer-aula-avanzado.git
```

Install Dependencies
```
cd /opt/dialer-aula-avanzado/
npm install --force
npm run build
```

Edit enviroment variables in /opt/dialer-aula-avanzado/ (changues values)
```
cp env-example .env
```

# Run the Project
In production
```
npm start
```

In development
```
npm run dev
```

Init pm2
```
cd /opt/dialer-aula-avanzado/
npm run build
pm2 start dist/index.js --name dialer-aula-avanzado --time
pm2 startup
```
Remove init script via:
```
pm2 unstartup systemd
```

# Info
Gian Diego Javes Lecca