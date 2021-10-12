#!/usr/bin/env bash
# generate the sa by inputing database.
npx typeorm-model-generator \
    -h localhost \
    -d aki \
    -e mysql \
    -p 3306 \
    -u db_username \
    -x db_password
