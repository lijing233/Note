# ADB远程调试

设置手机和PC在同一网络；用USB连接手机；在终端输入：

1  adb tcpip 5555

解释：5555 端口是默认端口，也可以用其他端口

Step2：

断开手机与PC的USB连接，在终端输入：

adb connect IP:5555, 比如这样：

adb connect 192.168.107.132:5555

终端会返回：connected to 192.168.107.132:5555

Step3:

查看连接设备，在终端输入：

adb devices