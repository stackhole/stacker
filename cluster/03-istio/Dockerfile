FROM localhost:32000/ubuntu-builder

RUN export WORK_DIR=$(pwd)
ENV PATH=$PATH:$WORK_DIR


ENV ISTIO_NAMESPACE=default
ENV APP_DOMAIN=api
ENV DOMAIN_ROOT=stackhole.com
ENV ORGANIZATION=stackhole

COPY start.sh .
RUN chmod a+x start.sh

CMD ["start.sh"]