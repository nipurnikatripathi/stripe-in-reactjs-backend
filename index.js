var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

const stripe = require("stripe")(
  "sk_test_51I570NLDsrIZdeeLDdQcoUVCzfn3qfM48PyrykbwBZ6BPs4XdYIvwm3ebSB5sdkSePW8GTpPx9iPWxhNOkPTuvRi000VPJVqqK"
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(" Hurrah !!! it's working");
});

app.post("/payment", async (req, res) => {
  console.log("inside payment api", req.body.token);
  try {
    const response = await stripe.charges.create({
      amount: 10000,
      currency: "inr",
      description: "Example charge",
      source: req.body.token,
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

// creating checkout session

app.post("/create-checkout-session", async (req, res) => {
  console.log("inside checkout session", req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "TROUSER",
          },
          unit_amount: 1000,
        },
        quantity: 5,
      },
    ],
    mode: "payment",
    success_url: "https://www.google.com/",
    cancel_url: "https://localhost:3000/",
  });

  console.log("response of session", session.id);

  res.json({ id: session.id });
});

var server = app.listen(8080, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server is running at http://%s:%s", host, port);
});
