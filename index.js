import express from "express";
import bodyParser from "body-parser";

const port =3000;
const app=express();
var ui=[];
var d=new Date();
const year = d.getFullYear();
const month = (d.getMonth() + 1).toString().padStart(2, "0");
const day = d.getDate().toString().padStart(2, "0");
var full=[year,month,day].join("-");



app.use(bodyParser.urlencoded({extended:true}));
app.use (express.static("public"));
app.use((req,res,next)=>{
   console.log("The host name is : "+req.hostname+" and the IP is : "+req.ip+" and the method is : "+req.method);
next();
});
// Home page
app.get("/",(req,res)=>{
  
  res.render("index.ejs")
});
app.post("/reset",(req,res)=>{
       console.log(full);
       ui=[];
       res.render("index.ejs");
});
// All tasks page
app.get("/all",(req,res)=>{
  res.render("all.ejs",{ui:ui});
});
//today page
app.get("/today",(req,res)=>{
  console.log("the body of today : "+req.body);
  console.log(req.body["checkbox"]);
  res.render("today.ejs",{ui:ui,today:full});
});
app.post("/submit",(req,res)=>
{
  console.log((req.body["date"])+" the today date is "+full);
  
 addToList(req.body["checkbox"],req.body["text"],req.body["details"],req.body["date"]);
 res.render("today.ejs",{ui:ui,today:full});
}
);
//Missing page
app.get("/missing",(req,res)=>{
  res.render("missing.ejs",{ui:ui,today:full,day:day,month:month,year:year});
});
//server connect
app.listen(port,()=>{
    console.log(`Connected successfully to port ${port}`);
});

function addToList(check,task,text,date) {
  ui.push({checkbox:check,task:task,text:text,date:date});
}

