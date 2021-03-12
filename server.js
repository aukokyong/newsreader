const express = require("express");
const app = express();
const axios = require("axios");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // for parsing application/json

app.post("/url", (req, res) => {
  // console.log(req.body);

  axios.get(req.body.url).then((x) => {
    res.type("xml").send(x.data);
  });
  // res.send("POSTED");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000);
