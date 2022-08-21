#!/bin/sh
docker build -t istio-deploy .
docker run istio-deploy