//logic for routes
"use strict";

const userModel = require("../models/userModel")
const responseMessage = require("../utils/responseMessages");

const user = {};

//add user after login
/* { HTTP METHOD - POST, API ENDPOINT - http://localhost:3336/user/addUser }*/
user.addUser = async (req, res, next) => {
    try {
      let checkUser = await userModel.findOne({
        where: {
          email: req.body.email,
        },
        raw: true
      });
      if (checkUser) {
        return res.status(200).send({
            status: true,
            message: responseMessage.USER_EXISTS,
         });
      } 
      else {    
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;
            let data = {
                username: username,
                email: email,
                password: password,
            };

            let saveUser = await userModel.create(data);
            if (saveUser) {
                return res.status(200).send({
                    status: true,
                    message: responseMessage.ADD,
                 });
            }
        }
      }
    catch (err) {
        return res.status(400).send({
            status: false,
            message: responseMessage.ERROR,
        });
    } 
};

 //get all users list
/* { HTTP METHOD - GET, API ENDPOINT - http://localhost:3336/user/getAllUsers }*/
user.getAllUsers = async (req, res, next) => {
  try {
    let usersList = await userModel.findAll()
    if (usersList) {
      return res.status(200).send({
          status: true,
          message: responseMessage.USERSLIST,
          list : usersList
        });
    } 
    return res.status(500).send({
      status: false,
      message: responseMessage.LISTNOTFOUND,
    });
  }
  catch (err) {
      return res.status(400).send({
          status: false,
          message: responseMessage.ERROR,
      });
  } 
};

module.exports = user;

  