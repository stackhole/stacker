#!/bin/bash
#for f in $(find . -type f); 
#do sed -i -e "s/localhost\:32000/registry.container-registry.svc.cluster.local\:32000/g" $f;
#done


sed -i -e "s/localhost\:32000/registry.container-registry.svc.cluster.local\:32000/g" skaffold.yaml
sed -i -e "s/localhost\:32000/registry.container-registry.svc.cluster.local\:32000/g" Dockerfile