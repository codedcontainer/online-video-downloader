const { spawn } = require('child_process');
const path = require('path'); 
const fs = require('fs'); 

/**
 * 
 * @param {String} inputVideo 
 * @param {String} subtitle 
 * @param {String} outputName 
 */

const addSubtitle = (inputVideo, subtitle, subCmd, outputName, callback) => {
    const burnSubtitleCmd =     spawn('ffmpeg', ['-i', `${inputVideo}`, "-vf", `subtitles=${subtitle}`, `${outputName}`]);
    const attachSubtitleCmd =   spawn('ffmpeg', ['-i', `${inputVideo}`, '-c', 'copy', '-c:s', `${subtitle}`, `${outputName}`]);
    subCmd === "burn" ? ffmpeg = burnSubtitleCmd : ffmpeg = attachSubtitleCmd; 

    console.log(ffmpeg);
    ffmpeg.on('exit', (code) => {
        if (code === 0) {
            console.log('subtitle added');
            callback(); 
        }
        ffmpeg.stderr.on('data', (err) => {
            callback(err)
            console.log('err:', new String(err));
        });
    });
}

it('should burn subtitles to a video file', (done) => {
const docPath = path.resolve(__dirname, "../", "doc"); 
        addSubtitle(docPath+"/video.mp4", docPath+"/sub.srt", "burn", docPath+"/video_subs.mp4", (err)=>{
            if(!err){
                done(); 
            }

        });
});