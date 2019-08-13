const Queue = require('bull');

import {Video} from '../src/video'; 

function simpleMath(a,b, callback){
        callback (a+b); 

}
var videoQueue = new Queue('Video download queue');

    videoQueue.add({
        url: 'https://www.youtube.com/watch?v=a2hABR7ZhZ8',
        format: 160,
        name: "apex1.mp4"
    });

    videoQueue.add({
        url: 'https://www.youtube.com/watch?v=qr7WFZoMRSg',
        format: 160, 
        name: 'epstein.mp4'
    }); 

    

        videoQueue.process((job, done)=>{
                new Video(job.data.url).download(job.data.format, job.data.name, (percent, result)=>{
                    job.progress(percent); 
                    if (result){
                        done(); 
                    }
                });
             });

       

    
       
    
        videoQueue.on('completed', job => {
            console.log(`job with id ${job.id} has been completed`);
            
        }); 
 