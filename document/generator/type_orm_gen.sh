#!/usr/bin/env bash
# generate the sa by inputing database.
npx typeorm-model-generator \
    -h database-1.cjayoejqlkac.us-east-1.rds.amazonaws.com \
    -d aki \
    -e mysql \
    -p 3306 \
    -u admin \
    -x aki-dev123
