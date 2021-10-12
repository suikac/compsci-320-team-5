#!/bin/sh

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..

docker build -t aki/db db/;
docker run -dp 3001:3001 aki/db;
