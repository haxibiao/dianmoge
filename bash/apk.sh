#!/bin/bash

red=$'\e[1;31m'
grn=$'\e[1;32m'
yel=$'\e[1;33m'
blu=$'\e[1;34m'
mag=$'\e[1;35m'
cyn=$'\e[1;36m'
end=$'\e[0m'

function genapk() {
	echo -e "\n${blu}====================================================================> generating ... $1 apk ${end}"
	cd /data/app/$1
	bash ./bash/fix_npm.sh

	react-native-asset

	# react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/generated/assets

	cd ./android
	./gradlew clean assemble
}

function upload_apk() {

	echo "上传 apk 内测"
	cd /data/www/haxibiao.com
	php artisan cos:apk --app=$1

	echo "上传 apk 正式"
	cd /data/www/haxibiao.com
	php artisan cos:apk --app=$1 --prod
}

genapk "dianmoge"
upload_apk "dianmoge"
