#!/bin/bash

echo "fix android and ios app icons ...."
cd /data/app/dianmoge

sudo /bin/cp -rf ./src/assets/android/res ./android/app/src/main/

sudo /bin/cp -rf ./src/assets/ios/Images.xcassets ./ios/dianmoge/