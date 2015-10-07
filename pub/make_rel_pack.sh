#!/bin/sh
TAR_NAME=smart_node.tgz
echo $TAR_NAME
echo "make release package..."
rm -rf $TAR_NAME
tar -czvf $TAR_NAME -X ./package_exclude ../node-red/ ../Atlas/ ../io-js/ ../lib/ ../install.sh ../install_for_dev.sh ../README.md

cat install_head.sh smart_node.tgz >smart_node.install

chmod 755 ./smart_node.install

rm ./smart_node.tgz
