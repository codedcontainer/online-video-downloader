class VideoFormats extends React.Component {
    constructor(props) {
        super(props); 
       this.vidUrl =  this.props.vidUrl
       this.state = {
           videoFormats: []
        }
    }
    getformats(e){
        console.log('inside getFormats function');
        e.preventDefault();
        fetch('/video/formats', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vidUrl: this.vidUrl })
        }).then((res) => res.json())
            .then((json) => {
                videoFormats = json;
                render();
            }, (err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.getFormats} onChange={this.getformats}>Get Available Formats</button>
                <fieldset>
                    <label htmlFor="vidFormat">Video Format: </label>
                    <select name="vidFormat">
                        {this.state.videoFormats.map((format, index) => <option key={index} value={format.formatId}>{format.format} - {format.filesize}</option>)}
                    </select>
                </fieldset>
                </div>
        )
    }
}




class VideoDownload extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            vidUrl: 'https://www.youtube.com/watch?v=V-LvNk8g6vA',
            progress : { width: `0%` }, 
            progressAmnt: 0
        }; 
    }
    formSubmit(e) {
        e.preventDefault();
        socket.emit('video-download', JSON.stringify({
            vidUrl: e.target.vidUrl.value,
            formatCode: e.target.vidFormat.value
        }));
        socket.on('video-progress', (msg) => {
            progress = { width: `${msg}%` }
            progressAmnt = msg
            render();
        });
        socket.on('video-done', (msg) => {
            progress = { width: `100%` }
            progressAmnt = 100
            alert(msg);
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.formSubmit}>
                    <fieldset>
                        <label htmlFor="vidUrl">Video URL:</label>
                        <input type="text" name="vidUrl" id="vidUrl" defaultValue={this.state.vidUrl} />
                        
                    </fieldset>
                    <VideoFormats vidUrl={this.state.vidUrl}/>
                    <input type="submit" value="Submit" id="submit" />
                </form>
                <div className="w3-light-grey">
                    <div className="w3-container w3-blue" style={this.state.progress}>{this.state.progressAmnt}%</div>
                </div>
            </div>
        )
    }
}

function App(){
    return (
        <div>
            <VideoDownload />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('app'));


