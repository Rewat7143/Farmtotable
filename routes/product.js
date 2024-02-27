const { getProducts, createProduct, removeProduct, updateProduct, getMyProducts } = require("../controllers/product");
const { authMiddleware, getShopID } = require("../middlewares/authCheck");

const productRouter = require("express").Router();

productRouter.get('/all', getProducts);
productRouter.get("/mine",authMiddleware, getMyProducts);
productRouter.post('/create', authMiddleware, getShopID,createProduct)
productRouter.delete('/delPro/:id', authMiddleware, removeProduct)
productRouter.patch('/updPro/:id', authMiddleware, updateProduct)

module.exports = productRouter