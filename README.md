## 使用说明

本项目是个webpack的loader，请放在所有loader的最后一位，目前支持js和带有script标签的vue文件

平时写代码的时候在测试代码上面加一行// test（注意test和斜杠之间的空格）用来表明下面是测试代码。

之后代码被webpack编译的时候就会检测// test来预警你的代码中是否包含测试代码。