curl -L https://istio.io/downloadIstio | ISTIO_VERSION=$ISTIO_VERSION TARGET_ARCH=x86_64 sh -
istioctl install --set profile=minimal -y
kubectl label namespace default istio-injection=enabled