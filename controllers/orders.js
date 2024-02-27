const {omodel} = require("../models/ordersModel");
const { pmodel } = require("../models/productModel");

const getOrders = async(req, res) => {
    const {uid} = req.body;
    await omodel.find({uid: uid}).then((orders) => {
        if(orders.length > 0){
            orders.forEach((order) => {
                order.uid = "";
            })
            res.status(200).json({"orders":orders})
        }else{
            res.status(400).json({"msg": "no orders"})
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const getMonthlyOrders = async (req, res) => {
    const month = req.params.month;
    console.log(month)
    try {
        await omodel.find().then((orders) => {
            if(orders.length > 0){
                let monOrders = 0;
                orders.map((order) => {
                    let mon = order.orderDate.getMonth()+1;
                    if(mon == month){
                        monOrders += 1;
                    }
                })
                res.status(200).json({"Month":month,"orders-count":monOrders})
            }else{
                res.status(400).json({"msg": "no orders"})
            }
        }).catch((e) => {
            console.log(e)
            res.status(500).json({"msg": "Error, something went wrong"})
        })
    } catch (error) {
        console.log(error)
    }
}


const createOrder = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    await pmodel.findById(id).then(async(pd) => {
        if(pd != null){
            const newOrder = new omodel({
              uid: body.uid,
              pid: id,
              prodname: pd.pname,
              price: pd.price,
              quantity: 1,
              orderStatus: "Placed",
            });
            await newOrder.save().then(async() => {
                res.status(200).json({"msg": "New Order placed"})
            }).catch(() => {
                res.status(500).json({"msg": "Error, something went wrong"})
            })
        }
        console.log(pd)
    })
}

const updateOrder = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    await omodel.findOneAndUpdate({_id: id}, {
        orderStatus: body.status
    }).then(() => { 
        res.status(200).json({"msg": "update successfull"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const removeOrder = async(req, res) => {
    const id = req.params.id;
    await omodel.findOneAndDelete({_id: id}).then(() => {
        res.status(200).json({"msg":"Product deleted"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

module.exports = {getOrders, createOrder, removeOrder, updateOrder, getMonthlyOrders}