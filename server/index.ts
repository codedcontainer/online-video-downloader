import * as express from 'express';
import { Video } from '../src/Video';
import * as bodyParser from 'body-parser';
import * as formidable from 'formidable';
import { fileUpload } from '../src/fileUpload';
import {VideoConvert} from '../src/fileConvert'; 
import * as path from 'path';


const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 3000;
const fileSaveDir = path.resolve(__dirname, '../', 'fileSave');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("New server is working");
});
/* return url video download formats */
app.post('/video/formats', (req, res) => {
    const { vidUrl } = req.body;
    new Video(vidUrl).getFormats().then((formats) => {
        res.send(formats);
    }).catch((err) => {
        res.send(err);
    });
});

app.post('/video/upload', (req, res) => {
    let incomingForm = new formidable.IncomingForm();
    
    let filePath, fileExt; 
    incomingForm.parse(req, (err, fields, files)=>{
        if (err) res.send('form could not be read'); 
        fileExt = fields.encodeFormat; 
        
    });
    incomingForm.on('fileBegin', (name, file) => {
        file.path = fileSaveDir+'/'+ file.name; 
        filePath = fileSaveDir+'/'+ file.name; 
    });
    incomingForm.on('file', (name, file)=>{
        new VideoConvert(filePath).convert(fileExt).then((success)=>{
           res.send('file uploaded and converted')
        }).catch((err)=>{
            res.send('there was an error');
        }) 
    });
});

io.on('connection', function (socket) {
    /* download a video */
    socket.on('video-download', function (msg) {
        let json = JSON.parse(msg);
        const { vidUrl, formatCode } = json;
        new Video(vidUrl).download(formatCode, `sample.mp4`).then((response) => {
            if (response !== 0) {
                io.emit('video-progress', response);
            }
            else {
                io.emit('video-done', response);
            }
        });
    });
    /* upload a video */
    socket.on('file-upload', (msg: File) => {
        fileUpload.writeFile(msg).then((response) => {
            io.emit('file-upload', response);
        }).catch((err) => {
            io.emit('file-upload', err);
        });
    });
    socket.on('file-convert', (msg)=>{
        const json = JSON.parse(msg); 
        const {vidPath, encoder} = json; 
        new VideoConvert(vidPath).convert(encoder).then((success)=>{
            socket.emit('file-convert', success); 
        }).catch((err)=>{
            socket.emit('file-convert', err);
        })
    })
})

http.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})