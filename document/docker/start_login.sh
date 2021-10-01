#!/bin/sh
docker build -t aki/login login/;
docker run -dp 1234:1234 aki/login;
