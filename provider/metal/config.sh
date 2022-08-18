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

curl https://get.docker.com | sh -
usermod -aG docker ubuntu
newgrp docker

mkdir -p ~/.kube
microk8s config > ~/.kube/config

curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
sudo install ./skaffold /usr/local/bin/
