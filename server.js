const express           = require("express");
const path              = require("path");
const mongoose          = require("mongoose");
const bodyParser        = require("body-parser");
const morgan            = require('morgan');
const config            = require("./app/static/config");

const app               = express();
const userRouter        = require('./app/routes/userRoutes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/user', userRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


var uri = config.db;
mongoose.connect(uri, {useMongoClient: true, promiseLibrary: global.Promise });
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
