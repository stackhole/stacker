FROM ubuntu-base:latest

# Create a folder
RUN mkdir /actions-runner

# Move to new directory
WORKDIR /actions-runner

# Download the latest runner package
RUN curl -o actions-runner-linux-x64-2.289.2.tar.gz -L https://github.com/actions/runner/releases/download/v2.289.2/actions-runner-linux-x64-2.289.2.tar.gz
RUN tar xzf ./actions-runner-linux-x64-2.289.2.tar.gz

# Install dependency
RUN ./bin/installdependencies.sh

# Transfer ownership to the new user
RUN chown actions-runner /actions-runner

# Allow runner to update itself
COPY runLoop.sh .
RUN chmod -R a+rw /actions-runner
RUN chmod a+x runLoop.sh

# Switch to new user
USER actions-runner

# Run the config script
RUN ./config.sh --url https://github.com/stackbook/stacker --token ABWBMWKJK6H6QOICN6NWYADCJELFS

CMD ["/bin/bash", "/actions-runner/runLoop.sh"]
