CURR=`pwd`
tar -xzvf  atlas_Linux_*
cd /usr
tar -xzvf $CURR/libuv.bin.tgz
tar -xzvf $CURR/OpenCV-3.0.0-rc1.tgz
npm config set registry http://registry.cnpmjs.org
npm install -g node-gyp
