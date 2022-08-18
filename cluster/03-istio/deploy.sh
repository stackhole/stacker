#!/bin/sh
if [ -n "$GITHUB_REPOSITORY" ]; then
    bash deploy.sh 
fi 
skaffold run