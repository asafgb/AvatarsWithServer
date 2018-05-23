//import expressKerberos from 'express-kerberos';
const  express =require("express");
var bodyParser = require('body-parser')

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

app.post('/api/Check',jsonParser,function (req, res){//,expressKerberos()
  /*  res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
    const customers = [
        //{id:1, firstName: 'asaf', lastName: 'sh'},
        {id:2, firstName: 'asaf', lastName: 'sh1'},
        {id:3, firstName: 'asaf3', lastName: 'sh'},
    ];

    */

    

    res.json(customers);
})


/*app.get('/', expressKerberos(), (req, res) => {
    res.send(`Hello ${req.auth.username}!`);
  });
*/

app.listen(port, ()=> console.log(`start on ${port}`))