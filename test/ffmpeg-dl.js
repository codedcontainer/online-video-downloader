const { spawn } = require('child_process');

/**
 * 
 * @param {String} inputVideo 
 * @param {String} subtitle 
 * @param {String} outputName 
 */
const addSubtitles = (inputVideo, subtitle, outputName) => {
    const ffmpeg = spawn('ffmpeg', ['-i', `${inputVideo}`, "-vf", `subtitles=${subtitle}`, `${outputName}`]);
    ffmpeg.on('exit', (code) => {
        if (code === 0) {
            console.log('subtitle added');
        }
        ffmpeg.stderr.on('data', (err) => {
            console.log('err:', new String(err));
        });
    });
}

it('should add subtitles to a video file', () => {
        addSubtitles()

});