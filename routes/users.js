const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const User = require("../models/User");

const router = require("express").Router();
const response = require("../utility/response.js");

//UPDATE 

router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, process.env.PASSWORD_SECRET
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            {new: true}
        );
        
        response(res, 200, true, "User successfully updated", updatedUser);

    } catch (err) {
        response(res, 500, false, "Internal server error", err.message);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        
        response(res, 204, true, "User deleted successfully");
    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
});


//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user= await User.findById(req.params.id)
        const { password, ...others} = user._doc;

        response(res, 200, true, "Successfully fetched user", {others});
    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
});

//GET ALL USERS 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users= query ? await User.find().sort({ _id: -1}).limit(5) : await User.find();
        response(res, 200, true, "Successfully fetched all users", users);
    } catch (err) {
      response(res, 500, false, "Internal server error", err.message);
    }
});

//GET USER STATS 
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },

            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);

      response(res, 200, true, "Successfully fetched user stats", data);
    } catch (err) { 
      response(res, 500, false, "Internal server error", err.message);
    }
})



module.exports = router;
