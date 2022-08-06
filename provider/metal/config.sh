#!/bin/bash -xe
sudo apt update
sudo apt upgrade -y
sudo apt install -y emacs-nox
sudo apt install -y open-iscsi
sudo systemctl enable iscsid
sudo snap install microk8s --classic 
sudo snap install kubectl  --classic 
sudo usermod -a -G microk8s ubuntu
sudo chown -f -R ubuntu ~/.kube
newgrp microk8s
microk8s status --wait-ready
mkdir -p ~/.kube

curl https://get.docker.com | sh -
usermod -aG docker ubuntu
newgrp docker

mkdir /k8s
microk8s config > ~/.kube/config

microk8s enable community
microk8s enable dns
microk8s enable registry
microk8s enable metallb:192.168.1.70/32
microk8s enable openebs
