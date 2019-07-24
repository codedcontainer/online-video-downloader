import * as youtubedl from 'youtube-dl'; 
import * as path from 'path'; 
import * as fs from 'fs'; 

interface format{
    format:string,
    fileSize: string,
    ext: string
}

class Video{
    url:string;
    constructor(url){
        this.url = url; 
    }
    private getFormats(){
        youtubedl.getInfo(this.url, (err, info)=>{
            if (err) throw err; 
            let videoFormats = info.formats.map((value)=>{
                return {
                    format: value.format,
                    filesize: value.filesize,
                    ext: value.ext
                }
            });
            return videoFormats;
        })
    }
    private download(formatCode, outputName){
        var video = youtubedl(this.url, [`--format=${formatCode}`],{cwd: __dirname}); 
        video.pipe(fs.createWriteStream(outputName)); 
        video.on('end',()=>{
            console.log('video is done');
        });
    }
}
