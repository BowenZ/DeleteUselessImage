var fs = require('fs');
var rd = require('rd');
var deleteFolderRecursive = function(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
module.exports = {
	isDirectory: function(path) {
		try {
			return fs.lstatSync(path).isDirectory();
		} catch (e) {
			return false;
		}
	},
	readFile: function(filePath) {
		try {
			return fs.readFileSync(filePath, 'utf-8');
		} catch (e) {
			console.log('============');
			console.log(e);
			console.log('============');
			return '';
		}

	},
	writeFile: function(filePath, data) {
		/*fs.exists(filePath, function(exists) {
			if (!exists) {
				fs.mkdirSync(filePath, 0755);
			}
		});*/
		var result;
		fs.writeFile(filePath, data, function(err) {
			result = err ? false : true;
		});
		return result;
	},
	writeFileSync: function(filePath, data) {
		fs.exists(filePath, function(exists) {
			if (!exists) {
				fs.mkdirSync(filePath, 0755);
			}
		});
		return fs.writeFileSync(filePath, data);
	},
	appendFile: function(filePath, data) {
		var result;
		fs.appendFile(filePath, data, function(err) {
			result = err ? false : true;
		});
		return result;
	},
	deleteFolder: deleteFolderRecursive,
	deleteFile: function(filePath) {
		fs.unlink(filePath, function(err) {
			if (err) {
				console.log(err);
			}
		});
	},
	listFiles: function(filePath) {
		return rd.readSync(filePath);
	},
	listFilesFilter: function(filePath, filter) {
		return rd.readFileFilterSync(filePath, filter);
	},
	makeDir: function(dirName) {
		fs.mkdirSync(dirName, 0755, function(err) {
			if (err) {
				console.log(err);
			}
		});
	},
	copyFile: function(srcFile, destFile) {
		var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
		BUF_LENGTH = 64 * 1024;
		buff = new Buffer(BUF_LENGTH);
		fdr = fs.openSync(srcFile, 'r');
		fdw = fs.openSync(destFile, 'w');
		bytesRead = 1;
		pos = 0;
		while (bytesRead > 0) {
			bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
			fs.writeSync(fdw, buff, 0, bytesRead);
			pos += bytesRead;
		}
		fs.closeSync(fdr);
		return fs.closeSync(fdw);
	},
	listDir: function(dir, nameOnly){
		var result = [];
		if(dir === undefined){
			dir = fs.realpathSync('..');
		}
		rd.eachDirSync(dir, function(f, s) {
			var arr = f.split(dir)[1].split('\\');
			if(arr.length == 2){
				nameOnly?result.push(arr[1]):result.push(f);
			}
		});
		return result;
	}
}