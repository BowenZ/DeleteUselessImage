var fs = require('fs');  
var fileUtil = require('./fileUtil.js');

var config = JSON.parse(fileUtil.readFile('config.json'));

function deleteUselessImage(targetDir, config){
	var targetFile = '';
	if(config.auto){
		config.targetFile = fileUtil.listFilesFilter(targetDir,function(f){
			return f.split('\\').pop().match(config.targetFilter);
		});
		for(var i in config.targetFile){
			targetFile += fileUtil.readFile(config.targetFile[i]).toLowerCase();
		}
	}else{
		for(var i in config.targetFile){
			targetFile += fileUtil.readFile(config.targetDir + '\\' + config.targetFile[i]).toLowerCase();
		}
	}

	var imgArray;
	if(config.auto){
		imgArray = fileUtil.listFilesFilter(targetDir,function(f){
			return f.split('\\').pop().match(config.imageFilter);
		}); 
	}else{
		imgArray = fileUtil.listFilesFilter(targetDir + '\\' + config.imageDir, new RegExp(config.imageFilter));
		imgArray.shift();
	}

	var num = 0;
	var path = fs.realpathSync('..');
	//path =path + '\\' + config.targetDir.replace(new RegExp('/'), '\\') + '\\';

	if(config.backup){
		if(fileUtil.isDirectory(path + '\\imgBackup')){
			console.log('directory imgBackup already exists...');
		}else{
			fileUtil.makeDir(path + '\\imgBackup');	
		}
	}	

	for(var i in imgArray){
		if(fileUtil.isDirectory(imgArray[i])){
			console.log('++++++++cd ' + imgArray[i] + ' ++++++++');
			continue;
		}
		var imgName = imgArray[i].split(targetDir)[1].toLowerCase().replace(/\\/g, '/').slice(1); 
		if(config.nameOnly){
			imgName = imgName.split('/').pop();
		}
		if(targetFile.indexOf(imgName) == -1){
			if(config.backup){
				fileUtil.copyFile(imgArray[i], path + '\\imgBackup\\' + imgName.split('/').pop());
			}
			fileUtil.deleteFile(imgArray[i]);
			num++;
			console.log('delete file: ' + imgName);
		}
	}
	console.log('Finished. Delteted ' + num + ' files');
}
// console.log(fileUtil.listDir(config.targetDir, false));
if(config.batch){
	var targetDirs = fileUtil.listDir(config.targetDir, false);
	for(var index in targetDirs){
		// console.log(targetDirs[index]);
		if(targetDirs[index].indexOf('DeleteUselessImage') < 0 && targetDirs[index].indexOf('imgBackup') < 0){
			deleteUselessImage(targetDirs[index], config)
		}
	}
}
else if(!config.batch){
	deleteUselessImage(config.targetDir, config)
}
