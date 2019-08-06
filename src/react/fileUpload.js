class FileUpload extends React.Component{
    onSubmit(e){

    }
    render(){
        return (
            <form action="/" enctype="multipart/form-data" method="post" onSubmit={this.onSubmit}>
                <input type="file" name="video" accept="video/mp4, video/ogg, video/avi, video/mov, video/wmv, video/webm, video/mkv, video/flv"/>
            </form>
        )
    }
}