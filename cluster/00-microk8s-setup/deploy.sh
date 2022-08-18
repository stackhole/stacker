#!/bin/bashsh

microk8s enable community
microk8s enable dns
microk8s enable registry
microk8s enable metallb:192.168.1.70/32
microk8s enable openebs

echo "{\"insecure-registries\" : [\"192.168.1.138:32000\",\"localhost:32000\"]}" > ./daemon.json
sudo cp ./daemon.json /etc/docker/daemon.json
sudo systemctl restart docker