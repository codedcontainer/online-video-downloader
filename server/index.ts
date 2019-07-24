import * as express from 'express'; 
import {Video} from '../src/Video';
import { format } from 'path';
const app = express(); 
const port = 3000; 

app.use(express.static('client'));
app.use(express.urlencoded()); 

app.get('/', (req, res)=> {
    res.send("New server is working"); 
});
app.post('/',(req, res)=>{
    const {vidUrl, subUrl, vidFormat, subBurn} = req.body; 
    console.log(vidUrl);
    
    var video = new Video(vidUrl); 
    video.getFormats((formats)=>{
        console.log(formats);
    });


    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})