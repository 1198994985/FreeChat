
var fs = require('fs');
var uploadHost = `http://localhost:${3003}/uploads/`;
exports.handleUpLoad = ctx => {
  var file = ctx.request.files ? ctx.request.files.f1 : null; //得道文件对象
  if (file) {
    var path = file.path.replace(/\\/g, "/");
    var fname = file.name; //原文件名称
    var nextPath = "";
    if (file.size > 0 && path) {
      //得到扩展名
      var extArr = fname.split(".");
      var ext = extArr[extArr.length - 1];
      nextPath = path + "." + ext;
      //重命名文件
      fs.renameSync(path, nextPath);
    }
    //以 json 形式输出上传文件地址
    ctx.body = `{
        "fileUrl":"${uploadHost}${nextPath.slice(
      nextPath.lastIndexOf("/") + 1
    )}"
    }`;
  } else {
    ctx.body = "null";
  }
};