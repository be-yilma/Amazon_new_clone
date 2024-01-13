require("dotenv").config();

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_KEY);

// config app
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
    });

    //   ok - created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {}
  console.log(error);
  response.status(500).send("something went is wrong");
});

app.listen(10000, () => {
  console.log("server is Listening on port 10000");
});
