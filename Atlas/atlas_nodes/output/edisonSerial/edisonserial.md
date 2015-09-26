###Edison 串口发送

本节点可以使用Edison的串口发送字符串

####配置参数
1. Name：节点名字
2. SerialPort：串口设备名
3. SerialBaudrate：串口波特率
4. SerialDatabits：数据位
5. SerialParity：校验位
6. SerialStopbits：停止位

####输入
1. msg.payload：待发送字符串

####输出
无

####使用方法
1. Arduino扩展板上的0,1管脚在edison中对应设备`/dev/ttyMFD1`。
2. 向节点传入`msg.payload`信息，节点每接收到一次就会发送一次。