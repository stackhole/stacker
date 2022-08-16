FROM localhost:32000/ubuntu-builder:latest

ARG RUNNER_VERSION=2.295.0
ARG ACTIONS_TOKEN=token


RUN mkdir /home/actions-runner/
RUN mkdir /home/actions-runner/.kube/
RUN cp /root/.kube/config /home/actions-runner/.kube/config
RUN chmod a+rw /home/actions-runner/.kube/config

# Create a folder
RUN mkdir /actions-runner

# Move to new directory
WORKDIR /actions-runner

# Transfer ownership to the new user
RUN chown actions-runner /actions-runner

# Switch to new user
USER actions-runner

# Download the latest runner package
RUN curl -o actions-runner-linux-x64-$RUNNER_VERSION.tar.gz -L https://github.com/actions/runner/releases/download/v$RUNNER_VERSION/actions-runner-linux-x64-$RUNNER_VERSION.tar.gz
RUN tar xzf ./actions-runner-linux-x64-$RUNNER_VERSION.tar.gz
USER root
# Install dependency
RUN ./bin/installdependencies.sh
COPY runLoop.sh .
RUN chmod a+x runLoop.sh

USER actions-runner

# Run the config script
RUN ./config.sh --url https://github.com/stackhole/stacker --token $ACTIONS_TOKEN

CMD ["/bin/bash", "/actions-runner/runLoop.sh"]
