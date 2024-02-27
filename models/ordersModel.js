const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uid: { require: true, type: String },
  pid: { require: true, type: String },
  orderStatus: { require: true, type: String },
  prodname: { require: true, type: String },
  price: { require: true, type: String },
  quantity: { require: true, type: String },
  orderDate: { default: Date.now(), type: Date },
});

const omodel = mongoose.model("orders-models",schema);

module.exports = {omodel}