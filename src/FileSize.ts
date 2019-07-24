
export class FileSize{
    static byteDefArray = [
        [3, "KB", 1e3],
        [6, "MB", 1e6],
        [9, "GB", 1e9],
        [12, "TB", 1e12]
    ];

    static convertFileSize(fileSize:number){
        //convert the number to a stirng and determine the number of characters
        //take the number of characters and subtract by 1 get number of 0's
        const fileSizeStr = fileSize.toString();
        const numZeros = fileSizeStr.length - 1;
        if (numZeros % 3 == 0){
           let byteDef:Array<any> = this.byteDefArray[(numZeros / 3 ) - 1];
          let newValue = fileSize / byteDef[2]; 
          return `${newValue.toFixed(3)} ${byteDef[1]}`;
        }
        else{
            if (numZeros >= 3 && numZeros <=12 ){        
                let byteDef:Array<any> = this.byteDefArray[Math.floor(numZeros / 3) - 1];
                let newValue = fileSize / byteDef[2]; 
                return `${newValue.toFixed(3)} ${byteDef[1]}`;
            }
            if (numZeros > 12){
                return "Value outsize bounds";
            }
            else {
                return `${fileSize} Bytes`; 
            }
        }
    }
}
const aSize = FileSize.convertFileSize(1430875);
console.log(typeof aSize); 