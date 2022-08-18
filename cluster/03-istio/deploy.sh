#!/bin/sh
if [ -n "$GITHUB_REPOSITORY" ]; then
    bash registry-config.sh
fi
skaffold run