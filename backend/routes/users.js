const express = require('express');
const { userValidation, loginValidation } = require('../middlewares/validator');
const { createUser, login, getCurrentUser, updateUserProfile, updateUserAvatar  } = require('../controllers/users');
const auth = require('../middlewares/auth'); 

const router = express.Router();

router.post('/signup', userValidation, createUser); 
router.post('/signin', loginValidation , login); 


router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUserProfile);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;