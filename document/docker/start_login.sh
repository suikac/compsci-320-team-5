#!/bin/sh

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd "$parent_path"/../..

docker build -t aki/login login/;
docker run -dp 1234:1234 aki/login;
