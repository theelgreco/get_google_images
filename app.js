const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4040;
const axios = require("axios");

const getImageResults = require("./function.js");

app.use(cors());
app.use(express.json());

app.get("/:actor", (req, res) => {
  const { actor } = req.params;

  getImageResults(actor).then((url) => {
    res.status(200).send(url);
  });
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
