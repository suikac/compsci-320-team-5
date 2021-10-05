#!/bin/sh
docker build -t aki/backend backend/;
docker run -dp 3000:3000 aki/backend;

