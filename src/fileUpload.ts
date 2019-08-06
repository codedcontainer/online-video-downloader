import * as fs from 'fs'; 
import * as path from 'path'; 

export class fileUpload{
    static saveDir:string = path.resolve('../','fileSave'); 
    static writeFile(file:File){
      return new Promise((resolve, reject)=>{
        fs.writeFile(this.saveDir, file, (err)=>{
            if (err) reject(err); 
            resolve('file written');
        });
      }); 
    }
}