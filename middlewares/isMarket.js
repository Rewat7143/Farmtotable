const { rmodel } = require("../models/authModel");
const { smodel } = require( "../models/shopModel");
const jwt = require("jsonwebtoken")

async function IsMarket(req, res) {
    try {
        const email = jwt.decode(req.headers.token);
        const user = await rmodel.findOne({email});
        if(user != null){
            const shop = await smodel.findOne({uid: user._id});
            console.log(shop)
            if(shop != null){
                res.status(200).json({ msg: "Welcome to dashboard" });
            }else{
                res.status(403).json({ msg: "create Shop" });
            }
        }else{
            res.status(400).json({"msg": "not found!"})
        }
    } catch (error) {
        res.status(500).json({"msg": "something went wrong"})
    }
}

module.exports = IsMarket