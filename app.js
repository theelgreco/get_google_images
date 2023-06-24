const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4040;
const axios = require("axios");

const { getImageResults, getStreamingLink } = require("./function.js");

app.use(cors());
app.use(express.json());

app.get("/image/:actor", (req, res) => {
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

app.get("/search/link/:search_term", (req, res) => {
  const { search_term } = req.params;
  getStreamingLink(search_term).then((url) => {
    console.dir(url);
    res.status(200).send(url);
  });
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
