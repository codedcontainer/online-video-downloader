class VideoFileUpload extends React.Component{
  
     render(){
        return (
            <form action="/video/upload" encType="multipart/form-data" method="post">
                <input type="file" name="video" accept="video/mp4, video/ogg, video/avi, video/mov, video/wmv, video/webm, video/mkv, video/flv"/>
                <input type="submit"></input>
            </form>
        )
    }
}

ReactDOM.render(<VideoFileUpload />, document.getElementById('app'));