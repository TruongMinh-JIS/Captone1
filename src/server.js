import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectdb from './config/connectdb';
require('dotenv').config();



let app=express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));;

viewEngine(app);
initWebRouter(app);

connectdb();

let port =process.env.PORT || 8000;

app.listen(port, () =>{
    //callback
    console.log("" + port);
}) 
