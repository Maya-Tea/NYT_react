
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var History = require("./models/History");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//app.use(express.static("public"));

mongoose.connect("mongodb://root:password@ds113795.mlab.com:13795/savedarticles")
//mongoose.connect("mongodb://localhost/savedArticles");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/api/saved", function(req, res) {

  History.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// create new db entries
app.post("/api/saved", function(req, res) {
  console.log("BODY: " +JSON.stringify(req.body.article));

  let article = new History(req.body.article);

  article.save(function (error, doc) {
      if (error) {
          res.send(error);
      }
      else {
          res.send(doc);
      }
  });

});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

app.post("/api/delete", function(req, res) {
  console.log("BODY: " +JSON.stringify(req.body.articleId));
  let article=req.body.articleId;
  // var article = new History(req.body.article);
  //
  // article.save(function (error, doc) {
  //     if (error) {
  //         res.send(error);
  //     }
  //     else {
  //         res.send(doc);
  //     }
  // });
  History.findByIdAndRemove(req.body.articleId, (err, todo) => {
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    let response = {
        message: "Article successfully deleted",
        id: todo._id
    };
    res.status(200).send(response);
});

});
