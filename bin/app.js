#!/usr/bin/env node  
var unpackAtlas = require('../src/unpackAtlas');
var path = require('path');
var fs = require('fs');
var args = process.argv;

// program.version('v' + require('../package.json').version)  
//        .description('解包atlas文件')  
  
// program.command('unpackatlas <atlasfile> <outputFolder>')  
//        .alias('u')  
//        .description('解包atlas文件')  
//        .action(function (atlasfile, outputFolder) { 
//            console.log(atlasfile,outputFolder) 
//         unpackAtlas(path.dirname(atlasfile), atlasfile,outputFolder,function(){
//             console.log("文件解包到目录"+outputFolder);  
//         });  
         
//        })  
// program.parse(process.argv)  
  //console.log(args[0],args[2]);
// if (program.args.length === 0) {  
//   program.help()  
// }  
var file = args[2];
var folder = args[3]+"/";
unpackAtlas(file, fs.readFileSync(file,"utf8"),folder,function(){
                 console.log("文件解包到目录"+folder);  
             });  