CURR=`pwd`
LOG=$CURR/install.log

echo "updating mraa..."
opkg install $CURR/lib/libmraa0_0.7.3_i586.ipk
echo "done"

echo "updating upm..."
opkg install $CURR/lib/upm_0.3.1_i586.ipk
echo "done"

echo "cd /usr"
cd /usr

echo "install libuv..."
tar -xzvf $CURR/lib/libuv.bin.tgz &>> $LOG
echo "done"

echo "install opencv..."
tar -xzvf $CURR/lib/OpenCV-3.0.0-rc1.tgz &>> $LOG
echo "done"

echo "install libv4l..."
tar -xzvf $CURR/lib/libv4l.tgz &>> $LOG
echo "done"

echo "cd /opt"
cd /opt

echo "install festival..."
tar -xzvf $CURR/lib/festival_prebuild.tar.gz &>> $LOG
cd /opt/festival/festival/bin 
cp festival /usr/bin
echo "done"

cd $CURR

echo "log saved to $LOG"
