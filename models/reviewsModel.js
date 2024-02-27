const mongoose = require("mongoose");

const schema = mongoose.Schema({
    uid: {require:true, type:String},
    pid: {require:true, type:String},
    stars: {require:true, type: String},
    reviewMsg: {type:String}
})

const rvmodel = mongoose.model("review-models",schema);

module.exports = {rvmodel}