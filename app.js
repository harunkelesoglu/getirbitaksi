const express =  require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Model = require("./models/Model");
const app = express();
const textToJSON = require("./lib/textToJSON");

app.set("port",(process.env.PORT || 3000));
app.use(logger());
app.use(bodyParser.json('application/*+json'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text());
app.use(textToJSON); // if content-type is text/plain , it converts to JSON

app.get('/',(req,res)=>{
    res.json("please make a POST request to /searchRecord");
});

app.post('/searchRecord',function(req,res){

    const query = req.body;
    console.log(query);
    const data = {
        "code":0,
        "msg":"Success"
    };

    Model.getRecord(query)
         .then( docs => {
             data.records = docs;
            })
         .catch( err =>{
            data.msg = "Failed";
            data.err = err;
            })
         .then( () => res.json(data)); 
});

app.listen(app.get("port"),function(){
    console.log("Listening port: ",app.get('port'));
})

