CURR=`pwd`
LOG=$CURR/install.log

echo "cd /usr"
cd /usr

echo "install libuv..."
tar -xzvf $CURR/libuv.bin.tgz &>> $LOG
echo "done"

echo "install opencv..."
tar -xzvf $CURR/OpenCV-3.0.0-rc1.tgz &>> $LOG
echo "done"

echo "install libv4l..."
tar -xzvf $CURR/libv4l.tgz &>> $LOG
echo "done"

echo "log saved to $LOG"
