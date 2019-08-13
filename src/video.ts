const youtubedl = require('youtube-dl');
import { FileSize } from '../src/FileSize';
import * as async from 'async';
import * as fs from 'fs';
import * as path from 'path'; 

export class Video {
    url: string;
    saveDir:string = path.resolve('../','bin','fileSave'); 
    constructor(url:string) {
        this.url = url;
    }
    public getFormats() {
        return new Promise((resolve, reject) => {
            youtubedl.getInfo(this.url, (err, info) => {
                if (err) reject(err);
                let vidFormats = [];
                async.each(info.formats, (value: any, callback) => {
                    vidFormats.push({
                        format: value.format,
                        formatId: value.format_id,
                        filesize: FileSize.convertFileSize(value.filesize),
                        ext: value.ext
                    });
                    callback();

                });

                if (vidFormats.length == info.formats.length) {
                    resolve(vidFormats);
                }
            });
        });
    }
    public download(formatCode, outputName, callback) {
        return new Promise((resolve, reject) => {
            let myInterval;
            var video = youtubedl(this.url, [`--format=${formatCode}`], { cwd: __dirname });
        
            video.on('info', (info) => {
                console.log(info.filesize); 
                myInterval = setInterval(() => {
                    const stats = fs.statSync(outputName);
                    const decrease = info.filesize - stats.size;        
                    let percent = Math.floor((decrease / info.filesize) * 100);
                    percent = 100 - percent;
                    callback(percent)
                }, 250);
            });
            video.pipe(fs.createWriteStream(outputName));
            video.on('end', () => {
                clearInterval(myInterval);
                callback(null,'video is done'); 
            });
        });

    }
}

// let video = new Video("https://www.youtube.com/watch?v=4w_cM9LgrHc"); 
// video.download('249', 'sample.mp4', (resolve)=>{
//     console.log(resolve);
// }); 
