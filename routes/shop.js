const { getShops, createShop, removeAccount, updateShop } = require("../controllers/shops");

const shopRouter = require("express").Router();

shopRouter.get('/', getShops);
shopRouter.post('/create', createShop)
shopRouter.delete('/delAcc/:id', removeAccount)
shopRouter.patch('/updAcc/:id', updateShop)

module.exports = shopRouter