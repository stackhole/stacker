#!/bin/bash -xe
sudo apt install -y emacs-nox
sudo apt install -y open-iscsi
sudo systemctl enable iscsid
snap install microk8s --classic 
snap install kubectl  --classic 
microk8s status --wait-ready
mkdir -p /home/vagrant/.kube
microk8s config > /home/vagrant/.kube/config
usermod -a -G microk8s vagrant
chown -f -R vagrant /home/vagrant/.kube

microk8s enable dns registry fluentd
microk8s.kubectl port-forward -n kube-system service/kibana-logging 8181:5601

curl https://get.docker.com | sh -
usermod -aG docker vagrant

curl -L https://istio.io/downloadIstio | sh -
cd istio*
sudo sh -c 'export PATH=$PWD/bin:$PATH && echo "PATH=\"$PATH\"" > /etc/environment'


