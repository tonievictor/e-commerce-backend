const router = require("express").Router();
cont response = require("../utility/response.js");

const stripe = require("stripe")("sk_test_51LXSfRHhVAhEjh6ZN2Keh5QEVeru118b5fX8nw6246rzJNGJEA11qan3W6tlpuxaaidsqbo7yFsPRpCtyl1vHHDU00JY0TwciD");

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            response(res, 500, false, "An error occured", stripeErr);
        } else {
            response(res, 200, true, "Payment succesful", stripeRes);
        }
    })
})


module.exports = router;
