const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const { body, validationResult } = require("express-validator");
const app = express();

app.use(
  Cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable("trust proxy", true);

// Heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("build"));
  app.get(
    "*",
    (req,
    (res) => {
      req.sendFile(path.resolve(__dirname, "build", "index.html"));
    })
  );
}

let balanceA = 1000;
let balanceB = 1000;
// Routes

app.get("/balances", (req, res) => {
  res.status(200).send({
    Abalance: balanceA,
    Bbalance: balanceB,
  });
});

app.post(
  "/moneyToB",
  body("money", "must be $1 or higher").isFloat({ min: 1 }),
  body("money", "2 decimals max").isLength({ max: 4 }),
  (req, res) => {
    const erroers = validationResult(req);
    if (!erroers.isEmpty()) {
      return res.status(406).json({
        error: erroers.array(),
      });
    } else {
      const Asent = req.body.money;
      balanceB = +balanceB + +Asent;
      balanceA = balanceA -= Asent;
      res.sendStatus(200);
    }
  }
);
app.post(
  "/moneyToA",
  body("money", "must be $1 or higher").isFloat({ min: 1 }),
  body("money", "2 decimals max").isLength({ max: 4 }),
  (req, res) => {
    const erroers = validationResult(req);
    if (!erroers.isEmpty()) {
      return res.status(406).json({
        error: erroers.array(),
      });
    } else {
      const Bsent = req.body.money;
      balanceA = +balanceA + +Bsent;
      balanceB = balanceB -= Bsent;
      res.sendStatus(200);
    }
  }
);

//

module.exports = app;
