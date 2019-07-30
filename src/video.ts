const youtubedl = require('youtube-dl'); 
import {FileSize} from '../src/FileSize';
import * as async from 'async';
import * as fs from 'fs'; 

interface format{
    format:string,
    fileSize: string,
    ext: string
}

export class Video{
    url:string;
    constructor(url){
        this.url = url; 
    }
    public getFormats(callbacka){
        youtubedl.getInfo(this.url, (err, info)=>{
            if (err) throw err; 
            var vidFormats = []; 
            async.each(info.formats, (value:any, callback)=>{            
                    vidFormats.push({
                        format: value.format,
                        formatId: value.format_id,
                        filesize: FileSize.convertFileSize(value.filesize),
                        ext: value.ext
                    });
                    callback();
                   
                });
                
                if (vidFormats.length == info.formats.length){
                    callbacka(vidFormats); 
                } 
            });

    }
    public download(formatCode, outputName, callback){
        var video = youtubedl(this.url, [`--format=${formatCode}`],{cwd: __dirname}); 
        video.pipe(fs.createWriteStream(outputName)); 


        let myInterval; 

        video.on('info', (info)=>{
           myInterval =  setInterval(()=>{
               const stats = fs.statSync(outputName); 
                const filesize = info.filesize; 
                const decrease = filesize - stats.size; 
               let percent = Math.floor( ( decrease / filesize) * 100);
               percent = 100 - percent; 


                callback(percent);

            }, 500);
            
        })


        // video.on('change', ()=>{
        //     callback('change');
        // });




        video.on('end',()=>{
            clearInterval(myInterval);
            callback(null, "video is done"); 
        });
;    }
}

// let video = new Video("https://www.youtube.com/watch?v=4w_cM9LgrHc"); 
// video.download('249', 'sample.mp4', (percentage, done)=>{
//     if (done){
//         console.log(done); 
//     }
//     else {
//         console.log(percentage);
//     }
// });

