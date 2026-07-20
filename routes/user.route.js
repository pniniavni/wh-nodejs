const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validation.middleware');
const { userRegisterSchema, userLoginSchema } = require('../middlewares/validation.schemas');

router.post('/register', validateRequest(userRegisterSchema), userController.registerUser);
router.post('/login', validateRequest(userLoginSchema), userController.loginUser);
router.get('/', userController.getAllUsers);

module.exports = router;