

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj "/O=$ORGANIZATION/CN=$DOMAIN_ROOT" -keyout $DOMAIN_ROOT.key -out $DOMAIN_ROOT.crt
openssl req -out $APP_DOMAIN.$DOMAIN_ROOT.csr -newkey rsa:2048 -nodes -keyout $APP_DOMAIN.$DOMAIN_ROOT.key -subj "/CN=$APP_DOMAIN.$DOMAIN_ROOT/O=$ORGANIZATION"
openssl x509 -req -sha256 -days 365 -CA $DOMAIN_ROOT.crt -CAkey $DOMAIN_ROOT.key -set_serial 1 -in $APP_DOMAIN.$DOMAIN_ROOT.csr -out $APP_DOMAIN.$DOMAIN_ROOT.crt
kubectl create -n istio-system secret tls $APP_DOMAIN-credential --key=$APP_DOMAIN.$DOMAIN_ROOT.key --cert=$APP_DOMAIN.$DOMAIN_ROOT.crt
