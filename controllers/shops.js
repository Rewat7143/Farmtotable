const {smodel} = require("../models/shopModel");
const {rmodel} = require("../models/authModel");

const getShops = async(req, res) => {
    await smodel.find().then((shops) => {
        if(shops.length > 0){
            res.status(200).json({"shops":shops})
        }else{
            res.status(400).json({"msg": "no shops available"})
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const createShop = async(req, res) => {
    const body = req.body;
    await smodel.findOne({uid: body.uid, email: body.email}).then(async(shop) => {
        if(shop === null){
            const newShop = new smodel(body);
            await newShop.save().then(async() => {
                await rmodel.findByIdAndUpdate(body.uid, {
                    merchantStatus: true
                }).then(() => {
                    res.status(200).json({"msg": "Merchant Account created"})
                })
            }).catch(() => {
                res.status(500).json({"msg": "Error, something went wrong"})
            })
        }else{
            res.status(400).json({"msg":"shop already exists on your account"})
        }
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const updateShop = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    await smodel.findOneAndUpdate({uid: body.uid, email: body.email, _id: id}, {
        shopname: body.shopname,
        addr: body.addr,
        desc: body.desc,
        dp: body.dp
    }).then(() => {
        res.status(200).json({"msg": "update successfull"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const removeAccount = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    await smodel.findOneAndDelete({uid: body.uid, email: body.email, _id: id}).then(() => {
        res.status(200).json({"msg":"Account deleted"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

module.exports = {getShops, createShop, removeAccount, updateShop}