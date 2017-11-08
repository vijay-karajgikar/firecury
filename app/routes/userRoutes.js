const express = require('express');
const userRouter = express.Router();
const bcryptjs = require('bcryptjs');

const userModel = require('../models/user');
module.exports = userRouter;

/* bcryptjs usage
//  http://davismj.me/blog/bcrypt/
// first, require it in
var bcrypt = require('bcryptjs');

// hash and save a password
hashedPassword = bcrypt.hashSync(submittedPassword, 10);

// check a password
bool validPassword = bcrypt.compareSync(submittedPassword, hashedPassword)
*/

userRouter.post('/register', (req, res) => {

    console.log("Register Method of userRouter");

    userModel.findOne({email: req.body.email}, (err, userFound) =>{

        if(err) {

            console.log("Error finding the user");
            return res.json({"success": false, "message": "Error finding the user"});

        } else {

            if(userFound) {

                console.log("User already exists");
                return res.json({"success": false, "message": "User with this email already exists"});

            } else {

                var newUser = new userModel();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = bcryptjs.hashSync(req.body.password, 10);
                newUser.address = req.body.address;
                newUser.website = req.body.website;
                newUser.age = req.body.age;
                userModel.create(newUser, (err, userCreated) => {
                    if(err) {
                        console.log("Error while creating the user");
                        console.log(err);
                        return res.json({"success": false, "message": "User creation failed"});
                    } else {
                        console.log("Created the user");
                        return res.json({"success": true, "message": "User creation successful"});
                    }
                });
            } // userFound
        } // err
    }); // findOne
}); // register service

userRouter.post('/details', (req, res) => {
    console.log('Details method of userRouter');

    userModel.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            console.log("Error getting the user details");
            console.log(err);
            return res.json({"success": false, "message": "Error while getting the user details"});
        } else {

            if(user) {
                console.log("User found");
                return res.json({"success": true, "user":user});
            } else {
                console.log("user not found");
                return res.json({"success": false, "message": "User not found"});
            } // user
        } // err
    }); // findOne
}); // details server
