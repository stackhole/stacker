FROM ubuntu-base:latest

# Create a folder
RUN mkdir /actions-runner

# Move to new directory
WORKDIR /actions-runner

# Setup minio cli
RUN mkdir /home/actions-runner
RUN chown actions-runner /home/actions-runner
RUN chmod a+rw /home/actions-runner
RUN curl https://dl.min.io/client/mc/release/linux-amd64/mc -o /home/actions-runner/mc
RUN chmod a+rx /home/actions-runner/mc

# Transfer ownership to the new user
RUN chown actions-runner /actions-runner

# Switch to new user
USER actions-runner

# Download the latest runner package
RUN curl -o actions-runner-linux-x64-2.289.2.tar.gz -L https://github.com/actions/runner/releases/download/v2.289.2/actions-runner-linux-x64-2.289.2.tar.gz
RUN tar xzf ./actions-runner-linux-x64-2.289.2.tar.gz
USER root
# Install dependency
RUN ./bin/installdependencies.sh
COPY runLoop.sh .
RUN chmod a+x runLoop.sh
USER actions-runner
RUN ls -la /actions-runner

# Run the config script
RUN ./config.sh --url https://github.com/stackbook/stacker --token ABWBMWLVD5SWL7YXBT4PMCTCJZOK6

CMD ["/bin/bash", "/actions-runner/runLoop.sh"]
