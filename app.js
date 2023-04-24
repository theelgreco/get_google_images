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
  const split = actor.split("&");
  let arr = [];

  split.forEach((actor) => {
    getImageResults(actor)
      .then((url) => {
        const names = actor.split("+");
        const capitalised = names.map((name) => {
          return name[0].toUpperCase() + name.slice(1);
        });
        const joinedName = capitalised.join(" ");
        arr.push({ name: joinedName, image: url });
      })
      .then(() => {
        if (arr.length === split.length) {
          res.status(200).send(arr);
        }
      });
  });
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
