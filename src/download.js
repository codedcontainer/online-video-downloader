class VideoFormats extends React.Component {
    constructor(props) {
        super(props); 
        this.getformats = this.getformats.bind(this);
       this.state = {
           videoFormats: []
        }
    }
    getformats(e){
      
        e.preventDefault();
        console.log('get formats button clicked');
        fetch('/video/formats', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vidUrl: this.props.vidUrl })
        }).then((res) => res.json())
            .then((json) => {
                this.setState(()=>{
                    return{
                        videoFormats: json
                    }
                })
                render();
            }, (err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <button type="button" className="ui button" onClick={this.getFormats}>Get Available Formats</button>
                <div className="field">
                    <div class="ui label">
                    <label htmlFor="vidFormat">Video Format:</label>
                    </div>
                    <select name="vidFormat" className="ui fluid dropdown">
                        {this.state.videoFormats.map((format, index) => <option key={index} value={format.formatId}>{format.format} - {format.filesize}</option>)}
                    </select>
                </div>
                </div>
        )
    }
}




class VideoDownload extends React.Component {
    constructor(props) {
        super(props); 
        this.handleVidUrlChange = this.handleVidUrlChange.bind(this); 
        this.state = {
            vidUrl: 'https://www.youtube.com/watch?v=V-LvNk8g6vA',
            progress : { width: `0%` }, 
            progressAmnt: 0
        }; 
    }
    handleVidUrlChange(event){
        event.persist(); 
        this.setState(()=>{
            return { 
                vidUrl: this.state.vidUrl
            }
        });
    }
    formSubmit(e) {
        e.preventDefault();
        socket.emit('video-download', JSON.stringify({
            vidUrl: this.state.vidUrl,
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
                <form onSubmit={this.formSubmit} className="ui form">
                    <div className="field">
                        <div className="ui label">
                        <label htmlFor="vidUrl">Video URL:</label>
                        </div>
                        <div className="ui input">
                        <input type="text" name="vidUrl" id="vidUrl" defaultValue={this.state.vidUrl} onChange={this.handleVidUrlChange}/>
                        </div>
                        
                        </div>
                    <VideoFormats vidUrl={this.state.vidUrl}/>
                   
                    <input type="submit" className="ui button" value="Submit" id="submit" />
                  
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


