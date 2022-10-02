#!/bin/bash
NAMESPACE=kafka
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -
kubectl create -f "https://strimzi.io/install/latest?namespace=$NAMESPACE" -n $NAMESPACE
kubectl label namespace $NAMESPACE istio-injection=enabled
kubectl apply -k kustomize -n $NAMESPACE
kubectl wait kafka/kafka-cluster --for=condition=Ready --timeout=300s -n $NAMESPACE 