const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("./middlewares/authCheck");
const authRouter = require("./routes/auth");
const ordersRouter = require("./routes/orders");
const productRouter = require("./routes/product");
const reviewRouter = require("./routes/reviews");
const shopRouter = require("./routes/shop");
const dotenv = require('dotenv').config()
const cloudinary = require("cloudinary");
const cors = require("cors");
const IsMarket = require("./middlewares/isMarket");

const app = express();
const DB = process.env.DB
const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({extended:true}));
app.use('/auth', authRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);
app.use("/shop", authMiddleware, shopRouter);
app.use("/review", authMiddleware, reviewRouter);
app.use("/ismarket", IsMarket)

console.log(DB)
mongoose.connect(DB).then(() => {
    app.listen(PORT, () => {
        console.log("server started")
    })
})
