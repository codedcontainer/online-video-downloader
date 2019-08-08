import * as fs from 'fs'; 
import * as path from 'path'; 

export class fileUpload{
    static saveDir:string = path.resolve('../','fileSave'); 
    static file:File; 
    static exists(){
      return new Promise((resolve, reject)=>{
        console.log(path.resolve(this.saveDir, this.file.name));
          fs.exists(path.resolve(this.saveDir, this.file.name), (exists)=>{
            if (exists){
              reject('File already exsists'); 
            }else{
              resolve(); 
            }
          });
      }); 
    }
    static async writeFile(file:File){
      this.file = file;
      console.log(path.resolve(this.saveDir, this.file.name));
      this.exists().then(()=>{
        return new Promise((resolve, reject)=>{
          fs.writeFile(this.saveDir, file, (err)=>{
              if (err) reject(err); 
              resolve('file written');
          });
        }); 
      }).catch((err)=>{
        return err; 
      })
    }
}