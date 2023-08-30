const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const Order = require("../models/Order");

const router = require("express").Router();
const response =  require("../utility/response.js");


//CREATE USER ORDER

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        response(res, 201, true, "Ordered created successfully", savedOrder );
    } catch (err) {
        response(res, 500, false, "Internal server error", err.message);
    }
});

// //UPDATE USER ORDER

router.put("/:id", verifyTokenAndAdmin, async (req,res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body
        },
            {new: true}
        );
        response(res, 200, true, "Order successfully updated", updatedOrder);

    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
});




// //DELETE USER ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        response(res, 204, true, "Order has been deleted successfully");
    } catch (err) {  
      response(res, 500, false, "Internal server error", err.message);
    }
});


// GET USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      response(res, 200, true, "User's order fetched successfully", orders);
    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
  });

//GET USER CART
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        response(res, 200, true, "Orders fetched successfully", orders);
    } catch (err) {
        response(res, 500, false, "Internal server error", err.message);
    }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      response(res, 200, true, "Monthly income fetched correctly", income);
    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
  });


module.exports = router;
