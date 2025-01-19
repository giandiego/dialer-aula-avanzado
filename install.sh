dnf update -y
dnf -y install epel-release

systemctl stop firewalld
dnf install -y certbot
systemctl start firewalld

curl -sL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf clean all && sudo dnf makecache
sudo dnf install -y gcc-c++ make
sudo dnf install -y nodejs
npm i -g pm2 --force

cp env-example .env