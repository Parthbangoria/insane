//jshint esversion:8
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema =  new mongoose.Schema({
    email : String,
    password : String
});


// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});


const User = mongoose.model("user",userSchema);

app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
 
app.get("/register",function(req,res){
    res.render("register");
});


app.post("/register",function(req,res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    
    const newUser = new User({
        email : req.body.username,
        password : hash

    });
    newUser.save();
    res.render("secrets");
});
});


app.post("/login",function(req,res){

User.findOne({email:req.body.username} )
    .then((docs)=>{
        // console.log("Result :",docs);
       if(docs){
        bcrypt.compare(req.body.password, docs.password, function(err, result) {
            if(result == true){
                res.render("secrets");
            }
            else{
                res.send("please enter the correct password");
            }
        });
        
       }
       else{
        res.send("please enter the correct email id");
       }
    })
    .catch((err)=>{
        console.log(err);
    });   
     
    
});





//    const username =;
//    const password = ;
// async function login (){
//     const  userid = await User.findOne({email:req.body.username});
//     if(userid){
//      if(userid.password === req.body.password){
//         res.render("secrects");
//      }
//      else{
//          res.send("please enter the correct password");
//      }
//      }
//      else{
//          res.send("you have entered the worng credentials");
//      }
//     }
     





// const hello =function(err,founditems){
//     if(err){
//         console.log(err);
//    }
//    else{
//     if(founditems){
//         if(founditems.password === password){
//             res.render("secrets");
//         }
//     }
//    }};
// });


app.listen(3000,function(){
    console.log("server started on port 3000");
});




// if(docs.password===req.body.password){
//     res.render("secrets");
// }
// else{
//     res.send("please enter the correct password");
// }

