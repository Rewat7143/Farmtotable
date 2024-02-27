const {pmodel} = require("../models/productModel");
const {rmodel} = require("../models/authModel");
const { smodel } = require("../models/shopModel");
const cloudinary = require("cloudinary");
const multer = require("multer");

async function handleUpload(file) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res.secure_url;
  } catch (error) {
    console.log(error)
  }
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

const getProducts = async (req, res) => {
  await pmodel
    .find()
    .then((products) => {
      if (products.length > 0) {
        let promises = products.map(async (prod) => {
          prod.uid = "";
          const shop = await smodel.findById(prod.sid);
          prod.uid = shop.shopname;
          prod.sid = "";
        });
        Promise.all(promises).then(() => {
          res.status(200).json({ products: products });
        });
      } else {
        res.status(400).json({ msg: "no products available" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ msg: "Error, something went wrong" });
    });
};


const getMyProducts = async (req, res) => {
  await pmodel
    .find({uid: req.body.uid})
    .then((products) => {
      if (products.length > 0) {
        products.map((prod) => {
          prod.uid = "";
          prod.sid = "";
        });
        res.status(200).json({ products: products });
      } else {
        res.status(400).json({ msg: "no products available" });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ msg: "Error, something went wrong" });
    });
};

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    body.img = await handleUpload(body.img);
    const newProduct = new pmodel(body);
    await newProduct.save();
    res.status(200).json({ msg: "New Product created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error, something went wrong" });
  }
};

const updateProduct = async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    await pmodel.findOneAndUpdate({_id: id}, {
        pname: body.pname,
        price: body.price,
        desc: body.desc,
        stock: body.stock
    }).then(() => {
        res.status(200).json({"msg": "update successfull"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

const removeProduct = async(req, res) => {
    const id = req.params.id;
    await pmodel.findOneAndDelete({_id: id}).then(() => {
        res.status(200).json({"msg":"Product deleted"})
    }).catch(() => {
        res.status(500).json({"msg": "Error, something went wrong"})
    })
}

module.exports = {
  getProducts,
  createProduct,
  removeProduct,
  updateProduct,
  getMyProducts,
};