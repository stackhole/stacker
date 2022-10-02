#!/bin/bash
NAMESPACE=camel-k
ORGANIZATION=stackhole
kubectl create namespace $NAMESPACE || true
kamel install -n $NAMESPACE --force --olm=false --registry localhost:32000 --organization $ORGANIZATION --registry-insecure true