yum update -y
yum  -y install epel-release

systemctl stop firewalld
yum install -y certbot
systemctl start firewalld

curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum clean all && sudo yum makecache fast
sudo yum install -y gcc-c++ make
sudo yum install -y nodejs
npm i -g pm2 --force
cp env-example .env