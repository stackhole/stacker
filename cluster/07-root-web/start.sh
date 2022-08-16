#!/bin/bash

mc alias set minio http://minio-cli-service.default.svc.cluster.local:9000 $ACCESS_KEY_ID $SECRET_ACCESS_KEY

mc mb --ignore-existing minio/$BUCKET_NAME
mc policy set download minio/$BUCKET_NAME
mc rm --recursive --force minio/$BUCKET_NAME
cd static
mc cp index.html minio/$BUCKET_NAME
cd ..