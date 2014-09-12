DeleteUselessImage
==========================

删除项目中没有用到的图片，需要安装Node.js， 需要放在与项目同级目录下

配置
--------------------------
修改config.json可更改配置

* auto: 自动模式，自动遍历项目文件夹，找到所有HTML、CSS和JS文件，删除没有在这些文件中出现的图片（Boolean）。
* batch: 批处理模式，如果目标文件夹下有多个项目，会自动处理该文件夹下的所有项目。
* targetDir: 目标项目名，如果是批处理模式则是项目的父目录名。
* backup: 是否备份删除的图片（Boolean），图片会备份在该工具所在目录的imgBackup中。
* nameOnly: 检查图片时是否带路径，如```<img src="img/xx.jpg"/>```，如果nameOnly为true，则只会检查xx.jpg，如false，会检查img/xx.jpg。
* targetFilter: 自动模式下检查的文件格式（非自动模式忽略）。
* targetFile: 有使用图片的文件名，通常为HTML、CSS、LESS和JS文件（自动模式下忽略）。
* imageDir: 存放图片的文件夹名（自动模式下忽略）。
* imageFilter: 处理的图片格式，默认为.jpg, .png, .gif。

```
{
	"auto": true,
	"batch": false,
	"targetDir": "D:\\project\\test\\toClient",
	"backup": true,
	"nameOnly": false,
	"targetFilter": ".html|.css|.js",
	"targetFile": ["expandable.html", "index.html"],
	"imageDir": "img",
	"imageFilter": ".gif|.png|.jpg"
}
```

运行
--------------------------
修改config.json，目录结构简单的项目通常只配置下targetDir就可以了

Window下配置完之后双击start.bat。

OSX下需用Shell运行```node main.js```（MAC下尚未测试）

测试不足，如有Bug及修改意见欢迎反馈