const assert = require('assert'); 
const fs = require('fs'); 
const https = require('https');
const path = require('path'); 
const unzipper = require('unzipper'); 

const docDir = path.resolve(__dirname, "../", "doc"); 

describe('download subtitle file', ()=>{
    it('should save a subtitle file', (done)=>{
        const subtitleUrl = "https://subscene.com/subtitles/english-text/lj7lv2Vu_LH_jx5wAgumHpq0mAzG9ULzjJEffnEqz88MbspY8ShXC2yl-X9zNxcVJk5B4k8FcJpPjDw_jRhhMobDdfTszNoVsgLy_rLDvGyT5Ig-R0vD3BzpJpbFLNk90";
        const file = fs.createWriteStream(docDir+"/sub.zip"); 
        https.get(subtitleUrl, (response)=>{
            response.pipe(file);
            done(); 
        });
    }); 
    it('should unzip a file if .zip', (done)=>{
       const stream =  fs.createReadStream(docDir+'/sub.zip').pipe(unzipper.Extract({path:docDir+"/sub"}));
       stream.on('close', ()=>{
           console.log('file has been written');
        done(); 
       });
    }); 
    it('should rename the subitle file',(done)=>{
        const newFileName = "The100_S06E06_name.srt"; 
        fs.readdir(docDir+'/sub', (err, files)=>{
            const fileName = files[0]; 

            fs.rename(docDir+'/sub/'+fileName, docDir+"/"+newFileName, (err)=>{
                if(err) throw err;

                    fs.rmdir(docDir+"/sub", (err)=>{
                        if (err) throw err; 

                        fs.unlink(docDir+"/sub.zip", (err)=>{
                            if (err) throw err; 
                            assert.ok(true, "zip file deleted"); 
                            done(); 
                        });                        
                    });                  
            }); 
        }); 
        
    });

});

//after the subtite file has been added to a video, remove the file from the directory