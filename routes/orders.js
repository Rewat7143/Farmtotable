const { getOrders, createOrder, removeOrder, updateOrder, getMonthlyOrders } = require("../controllers/orders");
const { authMiddleware, getID } = require("../middlewares/authCheck");

const ordersRouter = require("express").Router();

ordersRouter.get('/all', authMiddleware, getOrders);
ordersRouter.get('/:month', authMiddleware, getMonthlyOrders);
ordersRouter.get('/create/:id', authMiddleware, createOrder)
ordersRouter.delete('/delOrd/:id', authMiddleware, removeOrder)
ordersRouter.patch('/updOrd/:id', authMiddleware, updateOrder)

module.exports = ordersRouter