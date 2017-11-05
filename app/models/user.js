const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    address:    { type: String },
    website:    { type: String },
    age:        { type: Number },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date }

});

const User = module.exports = mongoose.model("User", userSchema);
