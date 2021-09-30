#!/bin/bash
npx prettier --write "**/*.ts"
cd backend;
yarn install;
yarn run start;