import * as express from 'express'; 
import {Video} from '../src/Video';
import { format } from 'path';
import bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app); 
var io = require('socket.io')(http);  
const port = 3000; 

app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 

app.get('/', (req, res)=> {
    res.send("New server is working"); 
});
app.post('/video/formats',(req, res)=>{
    //console.log(req.body);
   // res.send(req.body);
    //console.log('express / post');
    const {vidUrl, subUrl, vidFormat, subBurn} = req.body; 
    
    var video = new Video(vidUrl); 
    video.getFormats((formats)=>{
        res.send(formats);
    });
});
app.post('/video/download', (req, res)=>{
    const {vidUrl,formatCode} = req.body; 
    var video = new Video(vidUrl);
    video.download(formatCode, `sample.mp4`, (progress,result)=>{
        res.send(result);
    }); 
});
io.on('connection', function(socket){
    socket.on('video-download', function(msg){
        let json = JSON.parse(msg); 
        const {vidUrl,formatCode} = json; 
        var video = new Video(vidUrl);
        video.download(formatCode, `sample.mp4`, (percentage,done)=>{
            if (!done){
                io.emit('video-progress', percentage); 
            }
            else{
                io.emit('video-done', done);
            }
            

       io.emit('video-download', "video is done");
    }); 
    });
    socket.on('video-format', (msg)=>{
        //console.log(msg);
    })
    console.log('a user connected!');
})

http.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})