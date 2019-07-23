const assert = require('assert'); 
var youtubedl = require('youtube-dl');
var fs = require('fs');
const path = require('path');
const url = "https://www.youtube.com/watch?v=OMOGaugKpzs"; 
const docDir = path.resolve(__dirname, "../", "doc"); 
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
        var downloaded = 0 ;
        var video = youtubedl(url, ['--format=134'], {start: downloaded});
        video.pipe(fs.createWriteStream(docDir+'/video.mp4'));

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