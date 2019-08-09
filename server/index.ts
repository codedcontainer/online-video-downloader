import express, { response } from 'express';
import { Video } from '../src/Video';
import * as bodyParser from 'body-parser';
import * as formidable from 'formidable';
import { fileUpload } from '../src/fileUpload';
import { VideoConvert } from '../src/VideoConvert';
import {FileCheck} from '../src/FileCheck'; 
import {SearchFilter} from '../src/SearchFilter'; 
import * as path from 'path';
import * as fs from 'fs';

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

app.all('/video/uploaded/files', (req,res)=>{
    const searchQuery = req.query.s || req.query.search; 
        const files =  new FileCheck().listAllFiles(path.resolve(__dirname, '../', 'fileSave'))
   .then((data:any)=>{
       const filteredData =  new SearchFilter(req).filter(data,'name');
      res.status(200).json({filteredData}); 
   }).catch((err)=>{
       res.status(400).json(err);
   }); 
   
});
app.post('/video/converted/files', (req, res)=>{
    const files =  new FileCheck().listAllFiles(path.resolve(__dirname, '../', 'fileSave', 'converted'))
    .then((data:any)=>{
        const filteredData =  new SearchFilter(req).filter(data,'name');
       res.status(200).json({filteredData}); 
    }).catch((err)=>{
        res.status(400).json(err);
    }); 
})

app.post('/video/upload', (req, res) => {
    let incomingForm = new formidable.IncomingForm();

    let filePath, fileExt;
    incomingForm.parse(req, (err, fields, files) => {
        if (err) res.send('form could not be read');
        fileExt = fields.encodeFormat;
    });
    incomingForm.on('fileBegin', (name, file) => {
        filePath = path.resolve(fileSaveDir, file.name); 
        file.path = filePath;
        fs.exists(path.resolve(fileSaveDir, file.name), (exists) => {
            if (exists) {
                //see if the converted file exsists
                console.log('file already exists');
            } else {
                console.log('file does not exist')
            }
        });
    });
    incomingForm.on('file', (name,file)=>{
        console.log('uploaded file');
    });

    incomingForm.on('end', (name, file) => {
        new VideoConvert(filePath).convert(fileExt).then((success) => {
            console.log(success);
            res.send('file converted')
        }).catch((err) => {
            console.log(err);
            res.send('File already converted!');
        });
    });
});

io.on('connection', function (socket) {
    console.log('user connected');
    /* download a video */
    socket.on('video-download', function (msg) {
        let json = JSON.parse(msg);
        const { vidUrl, formatCode } = json;
        new Video(vidUrl).download(formatCode, `sample.mp4`, (percent, done)=>{
            if (percent !== 0) {
                io.emit('video-progress', percent);
            }
            if(done) {
                io.emit('video-done');
            }
        });
    });
    /* upload a video */
    // socket.on('file-upload', (msg: File) => {
    //     fileUpload.writeFile(msg).then((response) => {
    //         io.emit('file-upload', response);
    //     }).catch((err) => {
    //         io.emit('file-upload', err);
    //     });
    // });
    // socket.on('file-convert', (msg) => {
    //     const json = JSON.parse(msg);
    //     const { vidPath, encoder } = json;
    //     new VideoConvert(vidPath).convert(encoder).then((success) => {
    //         socket.emit('file-convert', success);
    //     }).catch((err) => {
    //         socket.emit('file-convert', err);
    //     })
    // });
})

http.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})