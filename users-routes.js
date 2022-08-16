const express=require('express');
const HttpError=require('../models/http-error');
const {check} =require('express-validator');
const usersController=require('../controllers/users-controller');

const router=express.Router();



router.get('/',usersController.getUsers);

router.post('/signup',[check('userName').not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({min:5})],usersController.signup); 

router.post('/login',usersController.login);


module.exports=router;