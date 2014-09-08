DeleteUselessImage
==========================

删除项目中没有用到的图片，需要安装Node.js， 需要放在与项目同级目录下

配置
--------------------------
* auto: 自动模式，自动遍历项目文件夹，找到所有HTML、CSS和JS文件，删除没有在这些文件中出现的图片。
* targetDir: 目标项目名。
* targetFile: 有使用图片的文件名，通常为HTML、CSS、LESS和JS文件（自动模式下忽略）。
* imageDir: 存放图片的文件夹名（自动模式下忽略）。
* imageFilter: 处理的图片格式，默认为.jpg, .png, .gif（自动模式下忽略）。
* backup: 是否备份删除的图片（Boolean）。

运行
--------------------------
Window下配置完之后双击start.bat。

OSX下需用Shell运行‘node main.js’（MAC下尚未测试）