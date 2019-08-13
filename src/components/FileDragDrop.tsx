import * as React from 'react'; 
//import ReactDOM from 'react-dom'; 

// eslint-disable-next-line no-unused-vars
class FileDragDrop extends React.Component {
    dropHandler(ev:any) {
        console.log('File(s) dropped');
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    var file = ev.dataTransfer.items[i].getAsFile();
                    console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (var b = 0; b < ev.dataTransfer.files.length; b++) {
                console.log('... file[' + b + '].name = ' + ev.dataTransfer.files[b].name);
            }
        }
    }
    dragHandler(e:any){
        e.preventDefault(); 
    }

    render() {
        return (
            <div id="drop_zone" onDrop={this.dropHandler} onDragOver={this.dragHandler}>
                <p>Drag one or more files to this Drop Zone ...</p>
            </div>
        )
    }
}