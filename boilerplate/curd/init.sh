#!/bin/bash

GITHUB_REPOSITORY=stackhole/user
REPOSITORY_NAME=${GITHUB_REPOSITORY#*/}
UPPER_REPOSITORY_NAME=${REPOSITORY_NAME^}


sed -i -e "s/curd/${REPOSITORY_NAME#*/}/g" test.txt 
sed -i -e "s/Curd/${UPPER_REPOSITORY_NAME#*/}/g" test.txt 