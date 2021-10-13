#!/bin/sh
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..

docker build -t aki/backend backend/;
docker run -dp 3000:3000 aki/backend;

