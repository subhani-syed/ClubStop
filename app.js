const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT||3000;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Connection to DataBase
mongoose.connect('mongodb://localhost:27017/clubstopDB');


// ClubSchema
const ClubSchema = {
    Name:String,
    Category:String,
    Desription:String,
    Team:Object,
    Acronym:String,
    Links:Object
}

// TeamSchema
const teamScehma = {
    Name:String,
    Role:String
}

const User = mongoose.model("User",teamScehma)
const Club = mongoose.model("Club",ClubSchema);

// Create a demo club
app.get("/newclub",(req,res)=>{
    const u1 = new User({
        Name:"Micheal",
        Role:"Manager"
    });
    const u2 = new User({
        Name:"Dwight",
        Role:"ARM"
    });
    const u3 = new User({
        Name:"Jim",
        Role:"CoManager"
    });
    const u4 = new User({
        Name:"Pam",
        Role:"Receptionist"
    });
    const c1 = new Club({
        Name:"Dunder Mifflin",
        Acronym:"DMPC",
        Desription:"An office workspace",
        Team:[u1,u2,u3,u4]
    })
    c1.save();
    console.log("New Club saved");
    res.send("Club Added");
});

app.get("/dm",(req,res)=>{
    Club.findOne({"Name":"Dunder Mifflin"},(err,club)=>{
        if(err){
            console.log(err);
        }else{
            console.log(club);
            res.render("club",{
                C_name:club.Name,
                C_sf:club.Acronym,
                C_des:club.Desription,
                team:club.Team
            })
        }
    })
});

app.get("/",(req,res)=>{
    res.render("welcome");
})

app.get("/home",(req,res)=>{
    res.render("home");
})

app.listen(PORT,()=>{
    console.log("App Running on 3000");
})