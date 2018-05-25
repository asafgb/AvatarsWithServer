//const expressKerberos = require('kerberos');


//import fetch from 'node-fetch';
//var {default: expressKerberos} = require('express-kerberos');
const fetch = require('node-fetch');
const  express =require("express");
var bodyParser = require('body-parser');
var requests = require('request');
var fs = require('fs');
var path = require('path');
var base64Img = require('base64-img');
var ews = require('ews-javascript-api');
var Canvas = require('canvas');
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



app.post('/api/Save',jsonParser, async function (req, res){//,expressKerberos()
   /*
   צריך לעשות
    const auth = req.get('authorization');
    if (!auth) {
        return res.status(401).set('WWW-Authenticate', 'Negotiate').end();
      }
      req.auth = req.auth || {};
      req.auth.token = auth.substring('Negotiate '.length);
    */
    switch(req.body.Mod)
    {
        case "save":
        if(req.body.itemId> -1)
        {
            var Hash = {}
            Hash['Email']= 'User@mail.com'
            var list =await getMoviesFromApiAsync();
            var choosen=list[req.body.itemId-1];
            //var x=getBase64(choosen.path)
            load(choosen.path ,res, Hash);
        }
        else
        {
            res.send({error:true,message:'No such as that Id'}).end();
            
        }
        break;
        case "Name":
                /*var Canvas = require('canvas')
                , Image = Canvas.Image
                , canvas = new Canvas(210, 300)
                , ctx = canvas.getContext('2d');

                  var colorArray = ["#cc66ff","#00ff00","#0000ff","#006600","#ff3300","#663300","#ff8c1a"];//"red", "#0000cc","#00ffcc"
                  var FirstColorIndex=Math.floor(Math.random() * colorArray.length);
                  var SecondColorIndex=Math.floor(Math.random() * colorArray.length);
                  var ThreeColorIndex=Math.floor(Math.random() * colorArray.length);
            
                  while(FirstColorIndex == SecondColorIndex || SecondColorIndex == ThreeColorIndex)
                  {
                     SecondColorIndex=Math.floor(Math.random() * colorArray.length);
                  }
            
                  while(FirstColorIndex == SecondColorIndex || FirstColorIndex == ThreeColorIndex)
                  {
                    FirstColorIndex=Math.floor(Math.random() * colorArray.length);
                  }
            

                  var widtharc= 170;
                  var higharc= 170;
                  var toMiddle =0
                  var radius=90
                  
                  ctx.beginPath();
                  ctx.fillStyle = colorArray[FirstColorIndex];
                  ctx.arc(widtharc/2 +toMiddle, higharc-toMiddle, radius, -Math.PI/2, 1 * Math.PI/2);
                  ctx.fill();
            
                  ctx.beginPath();
                  ctx.fillStyle = colorArray[SecondColorIndex];
                  ctx.arc(widtharc/2 +toMiddle, higharc-toMiddle, radius, Math.PI/2,  Math.PI+Math.PI/2);
                  ctx.fill();
            
            
                  ctx.fillStyle = colorArray[ThreeColorIndex];
                  ctx.font = "90px Arial";
                  ctx.fillText("א.ש", widtharc, higharc);

                  var fs = require('fs')
                , out = fs.createWriteStream('./text.png')
                , stream = canvas.pngStream();
                            
                stream.on('data', function(chunk){
                    out.write(chunk);
                });

                stream.on('end', function(){
                    //console.log('saved png');
                    res.send({error:false,message:'Your name picure'}).end();
                });*/
               // res.send({error:false,message:'Your name picure'}).end();
                var canvas = new Canvas(200, 300, 'svg');
                ctx = canvas.getContext('2d');
                // Use the normal primitives.

                var colorArray = ["#cc66ff","#00ff00","#0000ff","#006600","#ff3300","#663300","#ff8c1a"];//"red", "#0000cc","#00ffcc"
                var FirstColorIndex=Math.floor(Math.random() * colorArray.length);
                var SecondColorIndex=Math.floor(Math.random() * colorArray.length);
                var ThreeColorIndex=Math.floor(Math.random() * colorArray.length);
          
                while(FirstColorIndex == SecondColorIndex || SecondColorIndex == ThreeColorIndex)
                {
                   SecondColorIndex=Math.floor(Math.random() * colorArray.length);
                }
          
                while(FirstColorIndex == SecondColorIndex || FirstColorIndex == ThreeColorIndex)
                {
                  FirstColorIndex=Math.floor(Math.random() * colorArray.length);
                }
          

                var widtharc =canvas.width/2 //canvas.width  *(2/3);
                var higharc  = canvas.height/2 //canvas.height *(2/3);
                var toMiddlewid =widtharc *(5/6);  // *(9/10); if half
                var toMiddlehig =higharc  *(1/10);
                var radius=90

                ctx.beginPath();
                ctx.fillStyle = colorArray[FirstColorIndex];
                ctx.arc(widtharc,higharc, radius, 0,  Math.PI*2);//widtharc/2 +toMiddle, higharc-toMiddle
                ctx.fill();
                
                /*ctx.beginPath();
                ctx.fillStyle = colorArray[FirstColorIndex];
                ctx.arc(widtharc,higharc, radius, -Math.PI/2, 1 * Math.PI/2);//widtharc/2 +toMiddle, higharc-toMiddle
                ctx.fill();
          
                ctx.beginPath();
                ctx.fillStyle = colorArray[SecondColorIndex];
                ctx.arc(widtharc,higharc, radius, Math.PI/2,  Math.PI+Math.PI/2);
                ctx.fill();*/

                //ctx.textAlign="right" 
                ctx.fillStyle = colorArray[ThreeColorIndex];
                ctx.font = "90px Arial";
                //ctx.fillText("א.ש", widtharc-toMiddle, higharc);
                var name = "ג.ש."
                name=revese(name);
                //console.log(name);
                ctx.fillText(name,widtharc-toMiddlewid, higharc+toMiddlehig)
                res.send({error:false,message:canvas.toBuffer().toString('base64')}).end();

                fs.writeFile('out.svg', canvas.toBuffer(),(call)=>{
                });
            break;
    }
    

   // res.json(customers);
})

function revese(str)
{
    var text="";
    for(var i = 0 ; i <str.length; i++)
    {
        text+=str[str.length-1-i];
    }
    console.log(text);
    return text;
}

/*app.get('/', expressKerberos(), (req, res) => {
    res.send(`Hello ${req.auth.username}!`);
  });
*/

app.listen(port, ()=> console.log(`start on ${port}`))

function load(picurl ,res, Hash)
{
    //להוסיף מספר random
  requests.get(picurl)
  .on('close',()=>{
      fs.readFile('doodle.png', (err, data)=>{
          let base64Image = new Buffer(data, 'binary').toString('base64');
          res.send({error:false,message:'Your picture Is upload'});
          fs.unlink('doodle.png', function(error) {
              if (error) {
                  throw error;
              }
              console.log('Deleted doodle.png');
          });
          Hash['TypeRequested']= 'UserPhoto'
          Hash['Content'] = base64Image;
          exchangeWebService(Hash)
          //return base64Image;
      })
  })
    .pipe(fs.createWriteStream('doodle.png'))

  
}

function exchangeWebService(hashtable)
  {
    //create AutodiscoverService object
    /*var autod = new ews.AutodiscoverService(new ews.Uri("https://autodiscover-s.outlook.com/autodiscover/autodiscover.svc"), ews.ExchangeVersion.Exchange2016);
    autod.Credentials = new ews.ExchangeCredentials("userName", "password");
    autod.SetUserPhoto(hashtable)*/

    var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
    exch.Credentials = new ews.ExchangeCredentials("userName", "password");
    //set ews endpoint url to use
    exch.Url = new ews.Uri("https://outlook.office365.com/Ews/Exchange.asmx"); 
    exch.setUserPhoto(hashtable)
  }
 function getMoviesFromApiAsync() {
    return fetch('https://api.myjson.com/bins/t97a2')
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