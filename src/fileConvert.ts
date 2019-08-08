import {spawn} from 'child_process'; 

export class VideoConvert{
    filePath:string;
    constructor(filePath:string){
        this.filePath = filePath; 
    }
    private replaceExt(encoder:string){
       const ext = this.filePath.match(/([.])\w+/g)[0]; 
       return this.filePath.replace(ext, `.${encoder}`); 
    }
    convert(encoder:string){
        return new Promise((resolve, reject)=>{
            const convertCmd = spawn('ffmpeg', ['-i', `${this.filePath}`, this.replaceExt(encoder)]);
            convertCmd.on('exit', (code)=>{
                if (code === 0){
                    resolve('Video Encoded'); 
                }
            convertCmd.stderr.on('err', (err)=>{
                reject(err); 
            })
            })
        }); 
    }
}

// new VideoConvert('/Users/jasonutt/Documents/github/online-video-downloader/fileSave/The Police - Every Breath You Take (Official Music Video)-OMOGaugKpzs.mp4').convert('avi').then((done)=>{
//     console.log(done); 
// }).catch((err)=>{
//     console.log(err)
// });