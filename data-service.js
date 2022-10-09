const fs =require('fs'); // This function is used to read the files from data given


//Global Variables
var employees;
var departments;

//The exported function
var exports = module.exports={};
exports.initialize = function(){
    return new Promise(function(resolve,reject){
        fs.readFile('./data/employees.json',(err,data)=>{
            if(err) reject(err)
            else{
                employees=JSON.parse(data);
                fs.readFile('./data/departments.json',(err,data)=>{
                    if(err) reject(err)
                    else
                    departments=JSON.parse(data);
                    resolve("ALL FILES ARE AVAILABLE TO USE")
                })
            }
        })
    })
}

//This function will provide the full array of "employee" objects using the resolve method of the returned promise. 
exports.getAllEmployees = function(){
    return new Promise(function(resolve,reject){
        if(employees.length!=0)
        resolve(employees);
        else
        reject("Employee has no data in it")
    })
}

//This function will provide an array of "employee" objects whose isManager property is true using the resolve method of the returned promise. 
exports.getManagers=function(){
    var managers=[];
    return new Promise(function(resolve,reject){
        if(employees.length!=0)
        for(let i=0;i<employees.length;i++){
            if(employees[i].isManager==true)
            managers.push(employees[i])
        }
        else{
            reject("The provided employee array is empty..")
        }
        if(managers.length!=0){
            resolve(managers);
        }
        else{
            reject("Sorry there is no managers available")
        }
    })
}

exports.getDepartments=function(){
    return new Promise(function(resolve,reject){
        if(departments.length!=0)
        resolve(departments);
        else
        reject("Sorry there is no data for departments")
    })
}