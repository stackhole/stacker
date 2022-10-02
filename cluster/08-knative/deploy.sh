#!/bin/bash
kubectl apply -f https://github.com/knative/operator/releases/download/knative-v1.7.0/operator.yaml
kubectl config set-context
 --current --namespace=default
kubectl apply -k kustomize