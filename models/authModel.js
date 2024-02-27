const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {require:true, type:String},
    email: {require:true, type:String},
    addr: {require:true, type:String},
    password: {require:true, type:String},
    merchantStatus: {default: false, type:Boolean}
})

const rmodel = mongoose.model("auth-models",schema);

module.exports = {rmodel}