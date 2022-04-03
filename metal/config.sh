#!/bin/bash -xe
sudo apt install -y emacs-nox
sudo apt install -y open-iscsi
sudo systemctl enable iscsid
sudo snap install microk8s --classic 
sudo snap install kubectl  --classic 
microk8s status --wait-ready
mkdir -p ~/.kube
microk8s config > ~/.kube/config
usermod -a -G microk8s vagrant
chown -f -R vagrant ~/.kube

microk8s enable dns registry

curl https://get.docker.com | sh -
usermod -aG docker vagrant

curl -L https://istio.io/downloadIstio | sh -
cd istio*
sudo sh -c 'export PATH=$PWD/bin:$PATH && echo "PATH=\"$PATH\"" > /etc/environment'
