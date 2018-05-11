const gulp = require('gulp');
const path = require('path');
const unpackAtals = require('../src/index');
const streamtest = require('streamtest');
describe('unpackAtlas', () => {
    it("unpack atlas",(done)=>{
        let file = path.join(__dirname,'data','skeleton.atlas');
        gulp.src(
            file,{buffer:false}
        ).pipe(unpackAtals("./temp/",{baseRoot:"./tests/data/"})).pipe(streamtest.v2.toText(()=>{
            done();
        }));
        
    });
});