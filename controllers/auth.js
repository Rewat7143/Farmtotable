const { rmodel } = require("../models/authModel");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { smodel } = require("../models/shopModel");

const SALT = process.env.SALT;
 
const register = async(req, res) => {
    const body = req.body;
    await rmodel.findOne({email: body.email}).then(async(usr) => {
        if(usr === null){
            const hash = await bcrypt.hash(body.password, 12);
            const newUser = new rmodel({
                username:body.username,
                email:body.email,
                password:hash
            });
            await newUser.save().then(() => {
                const token = jwt.sign(body.email, ""+SALT);
                res.status(200).json({"msg": "Account created", "token": token})
            }).catch((e) => {
                console.log(e)
                res.status(500).json({"msg": "Error, something went wrong"})
            });
        }else{
            res.status(400).json({"msg": "Email already exists"})
        }
    })
}

const login = async(req, res) => {
    const body = req.body;
    await rmodel.findOne({email: body.email}).then(async(usr) => {
        if(usr != null){
            let unwrap = await bcrypt.compare(body.password, usr.password);
            if(unwrap){
                const token = jwt.sign(body.email, ""+SALT);
                res.status(200).json({"msg":"logged in", "token":token , "status": true})
            }else{
                res.status(400).json({"msg": "Invalid creds"})
            }
        }else{
            res.status(400).json({"msg": "Email does'nt exists"})
        }
    }) 
}


module.exports = {register, login}