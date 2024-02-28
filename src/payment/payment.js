const app = require("../app.js");
const stripe = require("stripe");

const stripeInstance = stripe(
  "sk_test_51Ok189GX4GJwDhejRmXLuhsCXGPn6mODeE2gCQSbh1HkQp4PY5UGDvWD1uoLKQT8UZ33aPk7VN9nIsmvnYV23n9G00BqJ9Q7DE"
);

const payment = (app) => {
  app.post("/create-payment-intent", async (req, res) => {
    const { salary } = req.body;
    const amount = parseInt(salary * 100);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};

module.exports = payment;
