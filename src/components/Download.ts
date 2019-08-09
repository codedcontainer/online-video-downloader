import socket from 'socket.io'; 
import React from 'react'; 
import ReactDOM from 'react-dom'; 

class VideoDownload extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormats = this.handleFormats.bind(this)
        this.handleVidUrlChange = this.handleVidUrlChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.state = {
            vidUrl: 'https://www.youtube.com/watch?v=OMOGaugKpzs',
            formats: [{ format: 'Select Get Availabe Formats' }]
        };
    }
    handleVidUrlChange() {
        this.setState(() => {
            return {
                vidUrl: this.state.vidUrl
            }
        });
    }
    handleFormats(e) {
        e.preventDefault();
        fetch('/video/formats', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vidUrl: this.state.vidUrl })
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState(() => {
                    return {
                        formats: json
                    }
                });
            }, (err) => {
                console.log(err);
            });
    }


    formSubmit(e) {
        e.preventDefault();
        socket.emit('video-download', JSON.stringify({
            vidUrl: this.state.vidUrl,
            formatCode: e.target.vidFormat.value
        }));

    }
    render() {
        return 
            <div>
                <h1>Download Video By URL</h1>
                <form onSubmit={this.formSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="vidUrl">Video URL:</label>
                        <input type="text" name="vidUrl" id="vidUrl" defaultValue={this.state.vidUrl} onChange={this.handleVidUrlChange} />
                    </div>
                    <VideoFormats vidUrl={this.state.vidUrl} handleFormats={this.handleFormats} formats={this.state.formats} />
                    <p>
                    <input type="submit" value="Submit" id="submit" className="ui button" />
                    </p>
                </form>
                <ProgressBar />
            </div>
    }
}

class VideoFormats extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <p> <button type="button" className="ui button" onClick={this.props.handleFormats}>Get Available Formats</button></p>
          
                <label htmlFor="vidFormat">Video Format:</label>
                <select name="vidFormat" className="fluid dropdown">
                    {this.props.formats.map((format, index) => <option key={index} value={format.formatId}>{format.format} - {format.filesize}</option>)}
                </select>
             
            </div>
        )
    }
}

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            active: ''
        }

        socket.on('video-progress', (msg) => {
            this.setState(() => {
                return {
                    progress: msg,
                    active: 'active'
                }
            })
        });
        socket.on('video-done', () => {
            return {
                progress: 100,
                active: 'success'
            }
        });
    }
    render() {
        return (
            <div>
                <div className={`ui indicating progress ${this.state.active}`} data-percent={this.state.progress}>
                    <div className="bar" style={{ "transitionDuration": 300 + 'ms', width: this.state.progress + '%' }}></div>
                    <div className="label">{this.state.progress}% Complete</div>
                </div>
            </div>
        )
    }
}

function App() {
    return (
        <div>
            <VideoDownload />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));


