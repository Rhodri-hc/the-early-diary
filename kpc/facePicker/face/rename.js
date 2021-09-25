const fs = require("fs");
//  当前目录
const PATH = "./music";

//  遍历目录得到文件信息
function walk(path, callback) {
  const files = fs.readdirSync(path);

  files.forEach(function(file) {
    if (fs.statSync(path + "/" + file).isFile()) {
      callback(path, file);
    }
  });
}

//  修改文件名称
function rename(oldPath, newPath) {
  fs.rename(oldPath, newPath, function(err) {
    if (err) {
      throw err;
    }
  });
}

//  运行
walk(PATH, function(path, fileName) {
  //  源文件路径
  const oldPath = path + "/" + fileName;
  //  新文件路径
  const newPath =
    path + "/" + fileName.replace(/([^\s]*)( - )([^\s.]*)(.\S*$)/, "$3$2$1$4");

  rename(oldPath, newPath);
});
