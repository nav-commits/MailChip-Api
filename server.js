// server created, this is created on a local server//
const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
require('dotenv').config();
const port = process.env.PORT;

const app = express();

const api = process.env.API_KEY;
const apier = process.env.API_KEYER;

app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email ;

var data= {
  members:[
    {
     email_address:email,
     status:"subscribed",
     merge_fields:{
       FNAME: firstName,
       LNAME: lastName
     }
    }
  ]
};

var jsonData = JSON.stringify(data);


var options= {
  url:`https://us3.api.mailchimp.com/3.0/lists/${api}`,
  method:"POST",
  headers:{
    "Authorization": `Navdeep ${apier}`
  },
  body:jsonData
};

request(options, function(error,response,body){

if(error){
res.sendFile(__dirname + "/failure.html");
}
else{
if(response.statusCode === 200){
  res.sendFile(__dirname + "/Success.html");
} else{
  res.sendFile(__dirname + "/failure.html");
}
}
});

});


app.listen(process.env.PORT || port, function(){
  console.log("server started on port 1024");

});
