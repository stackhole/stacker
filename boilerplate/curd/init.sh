#!/bin/bash

#GITHUB_REPOSITORY=stackhole/user

REPOSITORY_NAME=${GITHUB_REPOSITORY#*/}
UPPER_REPOSITORY_NAME=${REPOSITORY_NAME^}

for f in $(find . -type f); 
do sed -i -e "s/curd/${REPOSITORY_NAME}/g" $f && sed -i -e "s/Curd/${UPPER_REPOSITORY_NAME}/g" $f;
done

mv "src/controller/CurdController.ts" "src/controller/${UPPER_REPOSITORY_NAME}Controller.ts" 
mv "src/entity/Curd.entity.ts" "src/entity/${UPPER_REPOSITORY_NAME}.ts" 