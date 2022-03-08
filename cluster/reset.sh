#!/bin/bash
microk8s leave
microk8s enable dns registry
microk8s config > /home/vagrant/.kube/config
istioctl install --set profile=minimal -y