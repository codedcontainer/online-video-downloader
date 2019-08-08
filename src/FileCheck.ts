import * as fs from 'fs'; 

export class FileCheck{
    exists(path:string){
        fs.exists(path, (exists)=>{
            return exists; 
        })
    }
    listAllFiles(saveDir:string){
        return new Promise((resolve,reject)=>{
            fs.readdir(saveDir, {withFileTypes: true}, (err, items)=>{
                if(err) reject(err); 
                resolve(items.filter(item=>!item.isDirectory())); 
            });
        }); 
       
    }



}