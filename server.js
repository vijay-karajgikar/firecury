const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./app/static/config");
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('*', (req, res) => {
    var jsonString = "Welcome to Firecury Application, Created by Vijay Karajgikar at " + Date();
    res.json(jsonString);
});

/*  Mongo DB Connection */
var uri = config.db;
mongoose.connect(uri, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log("Error connecting to the database");
    console.log(err);
});

db.once('open', () => {

    /* Create Http server */
    app.listen(config.port, () => {

        console.log("==========================================================");
        console.log("");
        console.log(" Connected to " + config.databaseName + " at " + config.dbhost + " ");
        console.log("");
        console.log(" Firecury server available at http://localhost:" + config.port);
        console.log("");
        console.log("==========================================================");
    });


});
