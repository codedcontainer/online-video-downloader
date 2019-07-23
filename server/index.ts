import * as express from 'express'; 
const app = express(); 
const port = 3000; 

app.use(express.static('client'));
app.use(express.urlencoded()); 

app.get('/', (req, res)=> {
    res.send("New server is working"); 
});
app.post('/',(req, res)=>{
    console.log(req.body);
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})