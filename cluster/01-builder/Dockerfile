FROM ubuntu:22.04

ARG NODE_VERSION=18
ARG ISTIO_VERSION=1.14.3
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install -y apt-transport-https ca-certificates curl git apt-utils gnupg lsb-release
RUN curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y kubectl
RUN apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
RUN apt-get install -y fuse-overlayfs

RUN curl -L https://istio.io/downloadIstio | ISTIO_VERSION=$ISTIO_VERSION TARGET_ARCH=x86_64 sh -
RUN export WORK_DIR=$(pwd)
ENV PATH=$PATH:$WORK_DIR/istio-$ISTIO_VERSION/bin

RUN curl https://dl.min.io/client/mc/release/linux-amd64/mc -o ./mc
RUN chmod a+rx ./mc
ENV PATH=$PATH:$WORK_DIR

RUN curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
RUN chmod a+x skaffold
RUN cp skaffold /usr/local/bin/

# Make a new user
RUN useradd actions-runner
RUN usermod -aG docker actions-runner