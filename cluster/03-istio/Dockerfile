FROM localhost:32000/ubuntu-builder

RUN export WORK_DIR=$(pwd)
ENV PATH=$PATH:$WORK_DIR

COPY start.sh .
RUN chmod a+x start.sh

CMD ["start.sh"]