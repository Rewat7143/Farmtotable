const mongoose = require("mongoose");

const schema = mongoose.Schema({
    uid: {require:true, type:String},
    email: {require:true, type:String},
    shopname: {require:true, type:String},
    addr: {require:true, type:String},
    desc: {require:true, type:String},
    dp: {require:true, type:String}
})

const smodel = mongoose.model("shop-models",schema);

module.exports = {smodel}