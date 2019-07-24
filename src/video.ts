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
            //console.log(info);
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
    public download(formatCode, outputName){
        var video = youtubedl(this.url, [`--format=${formatCode}`],{cwd: __dirname}); 
        video.pipe(fs.createWriteStream(outputName)); 
        video.on('end',()=>{
            console.log('video is done');
        });
    }
}

