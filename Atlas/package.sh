cd ..
TAR_NAME=atlas_`uname`_`date +"%Y_%m_%d"`.tgz
echo $TAR_NAME
tar -czvf $TAR_NAME -X Atlas/package_exclude node-red Atlas io-js
