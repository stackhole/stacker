FROM localhost:32000/ubuntu-builder

ARG RUNNER_VERSION
ARG ACTIONS_TOKEN
ARG URL


RUN mkdir /home/actions-runner/
# Create a folder
RUN mkdir /actions-runner

# Move to new directory
WORKDIR /actions-runner

# Transfer ownership to the new user
RUN chown actions-runner /actions-runner
# Transfer ownership to the new user
RUN chown actions-runner /home/actions-runner

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
RUN ./config.sh --url $URL --token $ACTIONS_TOKEN

CMD ["/bin/bash", "/actions-runner/runLoop.sh"]
