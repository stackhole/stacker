FROM ubuntu:22.04

ARG ISTIO_VERSION=1.14.3

RUN curl -L https://istio.io/downloadIstio | ISTIO_VERSION=$ISTIO_VERSION TARGET_ARCH=x86_64 sh -
RUN export WORK_DIR=$(pwd)
ENV PATH=$PATH:$WORK_DIR/istio-$ISTIO_VERSION/bin

COPY start.sh .
RUN chmod a+x start.sh

CMD ["start.sh"]