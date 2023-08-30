const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const Cart = require("../models/Cart");

const router = require("express").Router();
const response = require("../utility/response.js")


//CREATE USER CART

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Product(req.body)

    try {
        const savedCart = await newCart.save();
        response(res, 201, true, "Cart Created", savedCart);
    } catch (err) {
        response(res, 500, false, "Internal Server Error", err.message);
    }
});

// //UPDATE USER CART

router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body
        },
            {new: true}
        );
        response(res, 200, true, "Cart Updated", updatedCart);

    } catch (err) {
      response(res, 500, false, "Internal Server Error", err,message);
    }
});




// //DELETE USER CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        response(res, 204, true, "Cart succesfuly deleted");
    } catch (err) {
      response(res, 500, false, "Internal Server Error", err.message);
    }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      response(res, 200, true, "Cart succesfuly fetched", cart);
    } catch (err) {
      response(res, 500, false, "Internal Server Error", err.message);
    }
  });


//GET All USER CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
        response(res, 200, true, "Fetched all carts succesfuly", carts);
    } catch (err) {
        response(res, 500, false, "Internal Server Error", err.message);
    }
})


module.exports = router;
