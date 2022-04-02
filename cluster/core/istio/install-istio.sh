curl -L https://istio.io/downloadIstio | ISTIO_VERSION=$ISTIO_VERSION TARGET_ARCH=x86_64 sh -
istioctl install --set profile=minimal -y
export PATH="$PATH:/actions-runner/_work/stacker/stacker/istio-$ISTIO_VERSION/bin"
kubectl label namespace default istio-injection=enabled