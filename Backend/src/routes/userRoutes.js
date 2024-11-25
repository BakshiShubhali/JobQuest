const express = require('express');
require('express-group-routes'); // Add group functionality to Express
const router = express();
const userController = require('../controllers/userController');

router.group('/user', (userRoutes) => {
  userRoutes.post('/addUser', userController.addUser);
  userRoutes.get('/getAllUsers', userController.getAllUsers);
});

module.exports = router;
