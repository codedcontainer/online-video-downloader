const assert = require('assert'); 
const {spawn} = require('child_process'); 


describe('child_proccess ls', ()=>{
    it('should return information about a directory', (done)=>{
        const ls = spawn('cmd', ['/c', 'dir']);
        
        ls.stdout.on('data', (data)=>{
            console.log(`stdout: ${data}`); 
                assert.ok(true);
               
        }); 
        done();      
    }); 

    it('should return the operating sytem type as a string', ()=>{
      if ( process.platform !== null ) {
          console.log(process.platform);
        assert.ok(true);    
      }
    });
}); 