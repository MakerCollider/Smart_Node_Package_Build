#!/bin/sh
line=`wc -l $0|awk '{print $1}'`
line=`expr $line - 10` 
rm -r io-js/ Atlas/ node-red/ lib/ README.md install.sh install_for_dev.sh  
tail -n $line $0 |tar xzv
./install.sh
ret=$?
#
#
#
exit $ret
