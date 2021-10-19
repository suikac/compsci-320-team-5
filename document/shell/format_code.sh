#!/bin/sh
# formatting the whole project
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..
npx prettier --write "**/*.ts"
