istioctl install --set profile=minimal -y
kubectl label namespace default istio-injection=enabled