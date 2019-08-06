import * as express from 'express';
import { Video } from '../src/Video';
import bodyParser = require('body-parser');
import { fileUpload } from '../src/fileUpload';
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 3000;

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
})

http.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})