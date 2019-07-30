let videoFormats = [];
let progress;
let progressAmnt = 0; 
const onSubmit = (e) => {
    e.preventDefault();
};

const getFormats = (e) => {
    e.preventDefault(); 
    const vidUrl = document.getElementById('vidUrl').value; 
    socket.emit('video-format', JSON.stringify({
        vidUrl: vidUrl
    }))


    fetch('/video/formats', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vidUrl: vidUrl })
    }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            videoFormats = json; 
            render(); 
        }, (err)=>{
            console.log(err);
        });
};

const formSubmit = (e) => {
    e.preventDefault();
    socket.emit('video-download', JSON.stringify({
        vidUrl: e.target.vidUrl.value,
        formatCode: e.target.vidFormat.value
    }));
    socket.on('video-progress', (msg)=>{
        progress = {width:`${msg}%`}
        progressAmnt = msg
        render();
    });
    socket.on('video-done', (msg)=>{
        progress = {width:`100%`}
        progressAmnt = 100
        alert(msg);
    });
    // fetch('video/download', {
    //     method: 'POST',
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({
    //         vidUrl: e.target.vidUrl.value,
    //         formatCode: e.target.vidFormat.value
    //     }) }).then((res) => {
    //         res.json();
    //         ; 
    //     }).then((json) => {
    //         console.log(json); 
    //         //render(); 
    //     },(err)=>{
    //         console.log(err);
    //     });
};

const videoFormatFieldset = () => {
    if (videoFormats.length > 0){
        return (
            <fieldset>
            <label htmlFor="vidFormat">Video Format: </label>
            <select name="vidFormat">
                {videoFormats.map((format, index)=> <option key={index} value={format.formatId}>{format.format} - {format.filesize}</option>  )}
            </select>
            </fieldset>
        )
    }
}


const render = () => {

const template = (
    <div>
        <form onSubmit={formSubmit}>
            <fieldset>
                <label htmlFor="vidUrl">Video URL:</label>
                <input type="text" name="vidUrl" id="vidUrl" />
                <button onClick={getFormats}>Get Available Formats</button>
            </fieldset>
            {videoFormatFieldset()}
            <fieldset>
                <label htmlFor="subUrl">Subtitle URL:</label>
                <input type="text" name="subUrl" id="subUrl" />
            </fieldset>
              
            <fieldset>
                <label htmlFor="subBrun">Burn Subtitles?</label>
                <input type="checkbox" name="subBurn" id="subBurn" />
            </fieldset>
            <input type="submit" value="Submit" id="submit" />
        </form>
        <div className="w3-light-grey">
        <div className="w3-container w3-blue" style={progress}>{progressAmnt}%</div>
        </div>
    </div>
)
ReactDOM.render(template, document.getElementById('app'));
}; 
render(); 
