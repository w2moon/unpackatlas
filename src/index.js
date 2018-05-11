

var through = require('through2');
var gutil = require('gulp-util');
var stream = require('stream');
var unpackAtlas = require('./unpckAtlas');


var PluginError = gutil.PluginError;




// 常量
const PLUGIN_NAME = 'unpackatlas';


// 插件级别函数 (处理文件)
function gulpAddClassName(toFolder,options) {



  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      unpackAtlas(file.path,file.contents,toFolder,()=>{
        this.push(file);
        cb();
      });
      return ;
    }

    if (file.isStream()) {

      var converter = new stream.Writable();
      let data = []; 
      converter._write = function (chunk,enc,done) {
        data.push(chunk);
        done();
      };
      converter.on('finish', () =>{ 
        unpackAtlas(file.path,Buffer.concat(data).toString(),toFolder,()=>{
          this.push(file);
        cb();
        });
        
      });
      file.contents.pipe(converter);
     
    }




  });

}

// 暴露（export）插件的主函数
module.exports = gulpAddClassName;