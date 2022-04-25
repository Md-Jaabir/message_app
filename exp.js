const express=require('express');
const path =require('path');
const fs=require('fs');
const app=express();

// app.use("/",express.static("test"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,"views"));

app.get("/open",(req,res)=>{
	res.render("open.pug");
});

app.get("/new_file",(req,res)=>{
	res.render("create_new.pug");
});

app.get("/",(req,res)=>{
	res.render("index.pug");
});



app.post("/",(req,res)=>{
	let filename=req.body.name;
	let filecontent=fs.readFileSync(filename,"utf-8");
	res.render("content.pug",{'fcontent':filecontent,'fname':filename});
});

app.post("/content",(req,res)=>{
	let filename=req.body.name;
	let filecontent=req.body.cont;
	fs.writeFileSync(filename,filecontent);
	res.render("content.pug",{"fname":filename,"fcontent":filecontent});
	
});

app.post("/create",(req,res)=>{
	let filename=req.body.folder+"/"+req.body.file_name;
	console.log(req.body);
	res.render("content.pug",{"fname":filename,"fcontent":""});
	fs.writeFileSync(filename,"");
});


app.listen(80);