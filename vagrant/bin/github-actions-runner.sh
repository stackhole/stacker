#!/bin/bash -xe

mkdir actions-runner && cd actions-runner# Download the latest runner package
curl -o actions-runner-linux-x64-2.288.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.288.1/actions-runner-linux-x64-2.288.1.tar.gz
echo "325b89bdc1c67264ec6f4515afda4534f14a6477d9ba241da19c43f9bed2f5a6  actions-runner-linux-x64-2.288.1.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.288.1.tar.gz
./config.sh --url https://github.com/stackbook --token ABWBMWKXEC465PDHH4DFETDCE3IOW
sudo ./svc.sh install
