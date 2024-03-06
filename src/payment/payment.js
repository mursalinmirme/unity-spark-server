import { app } from "../app.js";
import stripe from "stripe";

const stripeInstance = stripe(process.env.STRIPE_INSTANCE);

const payment = () => {
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

export default payment;
