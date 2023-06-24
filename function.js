const axios = require("axios");
const fs = require("fs/promises");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getImageResults(string) {
  return axios
    .get(`https://www.google.com/search?q=${string}&tbm=isch`)
    .then((res) => {
      const split = res.data.split("<");
      const filtered = split.filter((str) => {
        return str[0] + str[1] + str[2] === "img";
      });
      const imageTag = filtered[1].split(`src="`)[1];
      const url = imageTag.replace('"/>', "");
      return url;
    });
}

function getStreamingLink(string) {
  return axios
    .get(`https://www.google.com/search?q=${string}`)
    .then((res) => {
      const html = res.data;
      const dom = new JSDOM(html);

      const doc = dom.window.document;
      const url = doc
        .querySelector(".egMi0")
        .innerHTML.split("&amp;")[0]
        .split("url?q=")[1];
      // console.log(url);
      return url;
    })
    .catch((err) => {
      if (err) console.error(err);
    });
}

module.exports = { getImageResults, getStreamingLink };
