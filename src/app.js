const express=require("express")
const app=express()
const path=require("path");
require("./db/conn")
const Register=require("./models/registers");
const {PythonShell} =require('python-shell');
const client=require("twilio")('ACc8a7f24670b35c84763a2e5934a90b62','c75a73bbbd0358e3ea0262e2304f9f73');

const hbs=require("hbs");
const port=process.env.PORT || 3000//for random generation of port
var u_name;
const nodemailer=require('nodemailer');
const arr=[];

//const static_path=path.join(__dirname,"../public");

//app.use(express.static(static_path));
const template_path=path.join(__dirname,"../templates/views");
app.set("view engine","hbs");
const partials_path=path.join(__dirname,"../templates/partials");
app.set("views",template_path);

app.use(express.json())
app.use(express.urlencoded({extended:false}));
let user_name;
let pat_name;
var pass;
let f=0;
let prescr;
let g=0;
let check1=0;
let pname;
let pnum;
let pemail;
let age;
let pres;
let final_res;
let drug="";
let form="";
let frequency="";
let dosage="";
let route=" ";
pat_age=20;
pat_mob="";
pat_email=" ";
pat_pres=" ";
reqPath=" ";



var today = new Date();
var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index")//index.hbs
    console.log("in index");
});

app.get("/register",(req,res)=>{
    res.render("register");
     console.log("in register");
});
app.post("/doctor_page",(req,res)=>{
    res.render("doctor_page");
     
});
app.post("/register",async(req,res)=>{
    try{
        console.log("uname"+req.body.uname)
        
            const registerDoctor=new Register({
            username:req.body.uname,
            password:req.body.pass,
            fullname:req.body.fname,
            email:req.body.email,
            mobile:req.body.mobile
            
            
        })
    const registered= await registerDoctor.save();  
       
    }catch(error){
        res.status(400).send(error);
    }
    res.render("login");
});
app.get("/login",(req,res)=>{
    res.render("login");
    console.log("in login");
    
   
})
app.get("/doctor_page",(req,res)=>{
    res.render("doctor_page",{user_name:user_name});
     console.log("in doctor_page");
   
})
app.get("/insert_patient",(req,res)=>{
    res.render("insert_patient",{user_name:user_name});
    console.log("in insert");
   
})
app.get("/view_presc",(req,res)=>{
    res.render("view_presc",{drug:arr[0],form:arr[1],frequency:arr[2],route:arr[3],dosage:arr[4]});
     
});
 app.post("/view_presc",(req,res)=>{
    
     console.log("sndfjkasdn");
   

     reqPath = path.join(__dirname, '../');
     console.log(reqPath);
     res.render("doctor_page");
     var html_to_pdf = require('html-pdf-node');
     path1=reqPath+"templates/prescripitons/"+pat_name+".pdf";
     let options = { format: 'A4',path:path1};
var con="<!DOCTYPE html>"+
"<html>"+
    "<head>"+
       " <title>Prescription</title>"+
        "<style>"+
            "td{"+
                "font-size:20px;"+
                "font-family:sans-serif;"+
            "}"+
            "th{"+
                "color:turquoise;"+
                "font-size:50px;"+
                "font-family:sans-serif;"+
            "}"+
        "</style>"+
    "</head>"+
    "<body>"+
       "<center>"+
        "<table cellspacing="+"20px"+">"+
            "<tr>"+
                "<th colspan="+"8"+">PRESCRIPTION</th>"+
            "</tr>"+
            "<tr>"+
                "<td><b>Name:</b></td>"+
                "<td>"+pat_name+"</td>"+
                "<td><b>Age:</b></td>"+
                "<td>"+pat_age+"</td>"+
               " <td></td>"+
                "<td></td>"+
                "<td><b>Date:</b></td>"+
                "<td>"+time+"</td>"+
            "</tr>"+
                        "<tr><td colspan="+"6"+" style="+"color:#4B0082"+">"+drug+"</td></tr>"+
                        "<tr><td colspan="+"6"+"  style="+"color:#4B0082"+">"+dosage+"</td></tr>"+
                        "<tr><td colspan="+"6"+" style="+"color:#4B0082"+">"+form+"</td></tr>"+
                        "<tr><td colspan="+"6"+"  style="+"color:#4B0082"+">"+frequency+"</td></tr>"+
                        "<tr><td colspan="+"6"+" style="+"color:#4B0082"+">"+route+"</td></tr>"+
           " <tr>"+
                "<td colspan="+"2"+"><b>Doctor:</b></td>"+
                "<td colspan="+"2"+">"+user_name+"</td>"+
            "</tr>"+
            
        "</table>"+
           
        "</center>"+"</body></html>";
      
        
        
   


let file = { content: con,name:'example.pdf'};


html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
  console.log("PDF Buffer:-", pdfBuffer);
  sendMail();
    sendMessage();
});
         
    res.render("doctor_page",{user_name:user_name});
      });


function sendMail(){
  console.log(reqPath);   
     
      var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roopasri.gaddam@gmail.com',
    pass: 'ajlrijmoxaxvrzfk'
  }
});

var mailOptions = {
  from: 'roopasri.gaddaam@gmail.com',
  to: pat_email,
  subject: 'Prescription',
  text: 'Get Well Soon!!',
  attachments: [
        {
            filename: 'prescription.pdf',
            path:reqPath+"templates/prescripitons/"+pat_name+".pdf",
          
        }
    ]
    
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
function sendMessage(){
    client.messages.create({
      body:pat_pres,
      from: '+15734104489',
      to: pat_mob
    })
    .then(message => {
      console.log(pat_pres);
    }).catch((error) => {
      console.log(error)
    });
}
     
     




app.post("/login",(req,res)=>{
 
    console.log(req.body.luname)  
   
    user_name=req.body.luname;
     var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("doctor-reg");

  dbo.collection("registers").find({username:req.body.luname}).toArray(function(err, result) {
    if (err) throw err;
     try{
         console.log(result);
     var pass_check=result[0]["password"];
     if(pass_check==req.body.lpass){
         user_name=req.body.luname;
         res.render("doctor_page",{user_name:user_name,password:result[0]["password"],name:result[0]["fullname"],email:result[0]["email"],mobile:result[0]["mobile"]});
         
     }
     else
         res.render("index");
     }catch(err){
         res.render("index");
     }
    db.close();
  });
});
})

app.post("/insert_patient",(req,res)=>{
    
    console.log(user_name) 
    console.log(req.body.pname)
    console.log(req.body.page)
    console.log(req.body.pmob)
    console.log(req.body.pemail)
    pat_name=req.body.pname;
    console.log(user_name)
    pat_age=req.body.page;
    pat_mob=req.body.pmob;
    pat_email=req.body.pemail;

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    check1=1;
    if(err)
        throw err
  var dbo=db.db("patient_reg")
  
 
  var myobj = {doctor_id:user_name,patient_name:req.body.pname,patient_number:req.body.pmob,patient_email:req.body.pemail,patient_age:req.body.page};
   dbo.collection("patient_details").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
   
  });
    

})
  
console.log(check1)
    
            res.render("gen_pres")
       
})

app.post("/gen_pres",(req,res)=>{
    
    
    console.log("OKKKKKkk");
    console.log(req.body.check)
    console.log(user_name)
    pat_pres=req.body.check;
    
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
    
    if(err)
        throw err
  var dbo=db.db("prescriptions")
 
  var myobj = {doctor_id:user_name,patient_name:pat_name,prescription:req.body.check};
   dbo.collection("patient_pres").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
   
  })
  	let options = {
		mode: 'text',
		pythonOptions: ['-u'],
        // get print results in real-time
        args: [req.body.check]
		
		
	};
	
    console.log(__dirname);
	PythonShell.run('src/script1.py', options, function (err, result){
		if (err) throw err;
		
		console.log('result: ', result.toString());
         k=result.toString();

       const arr= k.split(",");
       drug=arr[0];
       dosage=arr[1];
        frequency=arr[2];
        route=arr[3];
        form=arr[4];
        console.log(arr);
        for(var i=0;i<arr.length;i++){
            final_res+=arr[i]+"\r\n";
        }
        console.log(final_res);
        pat_pres=k;
		res.render("view_presc",{pat_name:pat_name,age:pat_age,date:time,pres:final_res,d_name:user_name,drug:arr[0],form:arr[1],frequency:arr[2],route:arr[3],dosage:arr[4]});
	});
    
})


    
    
    
})
app.get("/display_prescription",(req,res)=>{
    res.render("display_prescription");
   
});
    
  
    
    
    
   

app.post("/display_prescription",(req,res)=>{
   
    
   
    patient=req.body.patname;
    console.log("doctor in post"+user_name);
   console.log("in post"+req.body.patname);
      var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("patient_reg");

  dbo.collection("patient_details").find({patient_name:patient,doctor_id:user_name}).toArray(function(err, result) {
    if (err) throw err;
      console.log(result);
      
     
      pname=result[0]["patient_name"]
      pnum=result[0]["patient_number"]
      pemail=result[0]["patient_email"]
      age=result[0]["patient_age"]
     
      
     
    db.close();
  })
});
   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("prescriptions");

  dbo.collection("patient_pres").find({patient_name:req.body.patname,doctor_id:user_name}).toArray(function(err, result) {
    if (err) throw err;
      console.log(result[0]["prescription"]);
      pres=result[0]["prescription"];
      
      console.log(pres)
      console.log(pname,age,pnum,pemail,pres) 
      res.render("display_prescription",{patient_name:pname,patient_age:age,patient_mobile:pnum,patient_email:pemail,prescription:pres})
    db.close();
  });
});
})


app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})