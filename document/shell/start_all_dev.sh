#! /bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..
yarn install
yarn --cwd backend run start:dev &
yarn --cwd db run start:dev &
yarn --cwd login run start:dev &
PORT=3002 yarn --cwd frontend run start &

wait
