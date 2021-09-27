#!/usr/bin/env bash
# generate the entities by inputing database.
npx typeorm-model-generator \
    -h localhost \
    -d aki \
    -e mysql \
    -p 3306 \
    -u ${DB_USER} \
    -x ${DB_PASSWORD}