var fs = require('fs');  
var fileUtil = require('./fileUtil.js');

var config = JSON.parse(fileUtil.readFile('config.json'));

var targetFile = '';
if(config.auto){
	config.targetFile = fileUtil.listFilesFilter('../'+config.targetDir,function(f){
		return f.split('\\').pop().match('.html|.css|.js');
	});
	for(var i in config.targetFile){
		targetFile += fileUtil.readFile(config.targetFile[i]).toLowerCase();
	}
}else{
	for(var i in config.targetFile){
		targetFile += fileUtil.readFile('../' + config.targetFile[i]).toLowerCase();
	}
}

var imgArray;
if(config.auto){
	imgArray = fileUtil.listFilesFilter('../'+config.targetDir,function(f){
		return f.split('\\').pop().match('.gif|.png|.jpg');
	}); 
}else{
	imgArray = fileUtil.listFilesFilter('../' + config.imageDir, new RegExp(config.imageFilter));
	imgArray.shift();
}

var num = 0;
var path = fs.realpathSync('..');
path =path + '\\' + config.targetDir.replace(new RegExp('/'), '\\') + '\\';

if(config.backup){
	if(fileUtil.isDirectory(fs.realpathSync('..') + '\\imgBackup')){
		console.log('directory imgBackup already exists...');
	}else{
		fileUtil.makeDir('../imgBackup');	
	}
}	

for(var i in imgArray){
	if(fileUtil.isDirectory(imgArray[i])){
		console.log('++++++++cd ' + imgArray[i] + ' ++++++++');
		continue;
	}
	var imgName = imgArray[i].split(path)[1].toLowerCase().replace(/\\/g, '/'); 
	if(targetFile.indexOf(imgName) == -1){
		if(config.backup){
			fileUtil.copyFile(imgArray[i], '../imgBackup/' + imgName.split('/').pop());
		}
		fileUtil.deleteFile(imgArray[i]);
		num++;
		console.log('delete file: ' + imgName);
	}
}
console.log('Finished. Delteted ' + num + ' files');
