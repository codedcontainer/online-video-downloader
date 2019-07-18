const assert = require('assert'); 
var youtubedl = require('youtube-dl');
var fs = require('fs');
const url = "https://www.youtube.com/watch?v=NiOcrA_HenE"; 

describe('youtube-dl',()=>{
    it('should return the video formats available', ()=>{
        youtubedl.getInfo(url,(err,info)=>{
            if (err) throw err; 
            
            var videoFormats = info.formats.map((value,index,array)=>{
                if (value.ext !== 'webm'){
                    return {
                        format: value.format, 
                        filesize: value.filesize,
                        ext: value.ext
                    }
                }
                else{
                    return null;
                }             
            }).filter((value, index, array)=>{
                return value !== null; 
            });
            //console.log(videoFormats);
        });
    }); 
    it ('should download a youtube video', (done)=>{
        var video = youtubedl(url, ['--format=136'], {start: downloaded});
        video.pipe(fs.createWriteStream('video.mp4'));

        video.on('info', function(info){
           // var total = info.size + downloaded; 
            if (downloaded > 0){
                console.log('remaining bytes: ' + info.size); 
            }

            console.log('Download Started'); 
        });
        video.on('end', ()=>{
            console.log('finished Downloading');
            done(); 
        })
       
    });
});