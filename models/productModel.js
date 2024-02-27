const mongoose = require("mongoose");

const schema = mongoose.Schema({
    uid: {require:true, type:String},
    sid: {require:true, type:String},
    pname: {require:true, type:String},
    price: {require:true, type:Number},
    desc: {require:true, type:String},
    stock: {require:true, type:Number},
    img: {require:true, type:String}
})

const pmodel = mongoose.model("product-models",schema);

module.exports = {pmodel}