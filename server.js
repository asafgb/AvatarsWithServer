//import expressKerberos from 'express-kerberos';
//import fetch from 'node-fetch';
const fetch = require('node-fetch');
const  express =require("express");
var bodyParser = require('body-parser');
var requests = require('request');
var fs = require('fs')
var base64Img = require('base64-img');
//var FileReader = require('filereader')
/*var http = require('http'),
    fs = require('fs'),
    url = require('url');*/


//var expressKerberos = require('express-kerberos');
const app = express();
var jsonParser = bodyParser.json()
const port =5000;

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 /*
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
*/
app.get('/api/customers',(req, res) =>{
    const customers = [
        {id:1, firstName: 'asaf', lastName: 'sh'},
        {id:2, firstName: 'asaf', lastName: 'sh1'},
        {id:3, firstName: 'asaf3', lastName: 'sh'},
    ];

    res.json(customers);
})



app.post('/api/Check',jsonParser, async function (req, res){//,expressKerberos()

    switch(req.body.Mod)
    {
        case "save":
        if(req.body.itemId> -1)
        {
            var Hash = {}
            Hash['email']= '8147115'
            var list =await getMoviesFromApiAsync();
            var choosen=list[req.body.itemId-1];
            //var x=getBase64(choosen.path)
            var x = load(choosen.path);
            //.then(data=>)
            res.send({error:false,message:'Your picture Is upload'});
//            var x =2;
        }
        else
        {
            res.send({error:true,message:'No such as that Id'});
            res.end()
            break;
        }
    }
    

   // res.json(customers);
})


/*app.get('/', expressKerberos(), (req, res) => {
    res.send(`Hello ${req.auth.username}!`);
  });
*/

app.listen(port, ()=> console.log(`start on ${port}`))
// async function saveIt(picurl)
// {
//     requests.get(picurl)
//     // .on('end',()=>{
//     //     var m="sd";
//     // })
//     .on('close',()=>{
//         var m="sd";
//     })
//     .on('response', function(response) {
//         console.log(response.statusCode) // 200
//         console.log(response.headers['content-type']) // 'image/png'
//       })
//       .pipe(fs.createWriteStream('doodle.png'))
      
// }
function load(picurl)
{
    //להוסיף מספר random
    //requests(picurl).pipe(fs.createWriteStream('doodle.png'))
//    await saveIt(picurl)
requests.get(picurl)
    .on('close',()=>{
        fs.readFile('doodle.png', (err, data)=>{
            let base64Image = new Buffer(data, 'binary').toString('base64');
            fs.unlink('doodle.png', function(error) {
                if (error) {
                    throw error;
                }
                console.log('Deleted doodle.png');
            });
        })
    })
      .pipe(fs.createWriteStream('doodle.png'))

    
}

/*function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }*/

 function getMoviesFromApiAsync() {
    return fetch('https://api.myjson.com/bins/t97a2')//')//'"https://feeds.citibikenyc.com/stations/stations.json"')
   .then((response) => response.json())
   .then(json =>{
     //console.log(json)
    return json;
   })
   .catch((error) => { 
     console.error(error);
   });
   ;
}