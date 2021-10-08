#!/bin/zsh
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..
#docker-compose build
docker-compose up
