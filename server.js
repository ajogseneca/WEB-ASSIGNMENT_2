/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: AJO GEORGE  Student ID: 157845215  Date: 08-10-2022
*
* Your app’s URL (from Cyclic) : ______________________________________________
*
*************************************************************************/ 
const data_services = require("./data-service.js")
var express = require("express"); 
var app = express();
app.use(express.static('public'));
var path = require("path"); 
var HTTP_PORT = process.env.PORT || 8080; 
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});


//modified routes
app.get("/employees",function(req,res){
    data_services.getAllEmployees().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err});
    })
})

app.get("/managers",function(req,res){
    data_services.getManagers().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err})
    })
})

app.get("/departments",function(req,res){
    data_services.getDepartments().then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json({"message":err});
    })
})

app.use((req, res) => {
    res.status(404).send("Sorry Guys This page is not found");
  });


data_services.initialize().then(function(data){
    app.listen(HTTP_PORT, onHttpStart);
  
  }).catch(function(err){
    console.log(err);
  })