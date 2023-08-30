const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const Product = require("../models/Product");

const router = require("express").Router();
const response = require("../utility/response.js");

//CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    response(res, 201, true, "Succesfully created product");
  } catch (err) {
    response(res, 500, false, "Internal server error", err.message);
  }
});

// //UPDATE PRODUCT

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    response(res, 200, true, "Succesfully updated product", updatedProduct);
  } catch (err) {
    response(res, 500, false, "Internal server error", err.message);
  }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    response(res, 204, true, "Product deleted Succesfully");
  } catch (err) {
    response(res, 500, false, "Internal server error", err.message);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    response(res, 200, true, "Succesfully fetched product", product);
  } catch (err) {
    response(res, 500, false, "Internal server error", err.message);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    response(res, 200, true, "Succesfully fetched all products", products);
  } catch (err) {
    response(res, 500, false, "Internal server error", err.message);
  }
});

module.exports = router;
