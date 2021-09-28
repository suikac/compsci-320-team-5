#!/bin/sh
docker build backend/ -t aki-team/backend # build the images
docker run -p 3000:3000 -d aki-team/backend # machines port : container port

