import * as fs from 'fs'; 

export class FileCheck{
    exists(path:string){
        fs.exists(path, (exists)=>{
            return exists; 
        })
    }
    listAllFiles(saveDir:string, callback){
            fs.readdir(saveDir, {withFileTypes: true}, (err, items)=>{
                callback(items.filter(item=>!item.isDirectory())); 
            });
  
       
    }



}