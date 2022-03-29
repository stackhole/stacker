FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive 

RUN sudo apt-get update
RUN sudo apt-get install -y apt-transport-https ca-certificates curl git
RUN sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
RUN sudo apt-get update
RUN sudo apt-get install -y kubectl

# Create a folder
RUN mkdir /actions-runner

# Move to new directory
WORKDIR /actions-runner

# Download the latest runner package
RUN curl -o actions-runner-linux-x64-2.288.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.288.1/actions-runner-linux-x64-2.288.1.tar.gz
# Optional: Validate the hash
#echo "325b89bdc1c67264ec6f4515afda4534f14a6477d9ba241da19c43f9bed2f5a6  actions-runner-linux-x64-2.288.1.tar.gz" | shasum -a 256 -c
# Extract the installer
RUN tar xzf ./actions-runner-linux-x64-2.288.1.tar.gz

# Install dependency
RUN ./bin/installdependencies.sh

# Make a new user
RUN useradd actions-runner

# Transfer ownership to the new user
RUN chown actions-runner /actions-runner

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Install Docker
RUN curl https://get.docker.com | sh -
RUN usermod -aG docker gactions-runner

# Switch to new user
USER actions-runner

# Run the config script
RUN ./config.sh --url https://github.com/stackbook/stacker --token ABWBMWLGF2PAVZQ45E3QWATCIKLQY

CMD ["./run.sh"]
