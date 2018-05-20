var mkdirp = require('mkdirp');
var fs =require("fs");
var path  = require("path");
var spine = require('./spine-parser');
var gm = require('gm');

function getAtlasInfo(atlas){
    return spine.parseAtlas(atlas);

}


function unpackRegion(dir,region,newName,toFolder,cb){
    var img = dir+region.page.name;
    if(region.rotate){
        // console.log("!!!use rotate",img);
    }
    var result = gm(img);
    if(region.rotate){
        result = result.crop(region.height,region.width,region.x,region.y).rotate("#000000",90);
    }
    else{
        result = result.crop(region.width,region.height,region.x,region.y);
    }
    
    if(region.originalHeight != region.height || region.originalWidth != region.width){
        
        result = result.extent(region.originalWidth,region.originalHeight);
    }
    var outFolder = toFolder+newName+".png";
    mkdirp(path.dirname(outFolder),function(){
        result.write(outFolder,function(err){
            if(err){
                console.log(err,region.name);
                cb(false);
            }
            else{
                cb(true);
            }
            
        });
    })
    
}

//load all atlas
module.exports = function unpackAtlas(atlasPath,atlas,toFolder,cb){
    mkdirp(toFolder,()=>{
        var info = getAtlasInfo(atlas);
        var name = "";
       
        var num = info.regions.length;
        var valid = true;
        function finish(result){
            if(!result){
                valid = false;
            }
            num--;
            if(num <= 0){
                cb(valid);
            }
        }
        for(var i=0;i<num;++i){
            unpackRegion(path.dirname(atlasPath)+"/",info.regions[i],info.regions[i].name+name,toFolder,finish);
        }
    });
    //to do
    
   
}