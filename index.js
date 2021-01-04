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

var server = app.listen(8080, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server is running at http://%s:%s", host, port);
});
