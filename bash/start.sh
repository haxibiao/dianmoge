#!/bin/bash

bash ./bash/fix_npm.sh 

echo "清理 babel cache ..."
rm -rf ./node_modules/.cache/babel-loader