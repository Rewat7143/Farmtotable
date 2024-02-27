const { rmodel } = require("../models/authModel");
const { smodel } = require("../models/shopModel");
const { pmodel } = require("../models/productModel")
const jwt = require("jsonwebtoken")

const authMiddleware = async(req, res, next) => {
    const token = req.headers.token;
    if(token != null){
        const email = jwt.decode(token);
        console.log(token, email)
        await rmodel.findOne({email: email}).then((usr) => {
            console.log(usr)
            if(usr != null){
                console.log(token)
                req.body.email = email;
                req.body.uid = usr._id;
                next();
            }else{
                res.status(500).json({"msg": "Error, something went wrong"})
            }
        })
    }else{
        res.status(500).json({"msg": "Error, something went wrong"})
    }
}

const getShopID = async(req, res, next) => {
    const email = req.body.email;
    await smodel.findOne({email:email}).then(shop => {
        if(shop != null){
            req.body.sid = shop._id;
            next();
        }else{
            res.status(400).json({"msg":"not found"})
        }
    })
}


module.exports = {authMiddleware, getShopID}