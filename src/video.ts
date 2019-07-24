const youtubedl = require('youtube-dl'); 
import {FileSize} from '../src/FileSize';
import * as path from 'path'; 
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
    public getFormats(callback){
        youtubedl.getInfo(this.url, (err, info)=>{
            //console.log(info);
            if (err) throw err; 
            let videoFormats = info.formats.map((value)=>{
                console.log(FileSize.convertFileSize(value.filesize)); 


                return {
                    format: value.format,
                    formatId: value.format_id,
                    filesize: value.filesize,
                    ext: value.ext
                }
            });
            callback(videoFormats);
        })
    }
    public download(formatCode, outputName){
        var video = youtubedl(this.url, [`--format=${formatCode}`],{cwd: __dirname}); 
        video.pipe(fs.createWriteStream(outputName)); 
        video.on('end',()=>{
            console.log('video is done');
        });
    }
}

