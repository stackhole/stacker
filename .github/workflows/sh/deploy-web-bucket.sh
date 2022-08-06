export ACCESS_KEY_ID=CHANGE_ME
export SECRET_ACCESS_KEY=CHANGE_ME
export BUCKET_NAME=static
./mc alias set minio http://minio-cli-service.default.svc.cluster.local:9000 $ACCESS_KEY_ID $SECRET_ACCESS_KEY
./mc mb minio/$BUCKET_NAME
./mc policy set download minio/$BUCKET_NAME
echo '<HTML><B>Hello World!</B></HTML>' > index.html
./mc cp index.html minio/$BUCKET_NAME