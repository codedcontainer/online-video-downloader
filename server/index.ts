import * as express from 'express'; 
import {Video} from '../src/Video';
import { format } from 'path';
import bodyParser = require('body-parser');
const app = express(); 
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

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})