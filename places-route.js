const express=require('express');
const HttpError=require('../models/http-error');
const {check} =require('express-validator');
const placesControllers=require('../controllers/places-controller');

const router=express.Router();



router.get('/:pid',placesControllers.getplacebyid);

router.get('/user/:uid',placesControllers.getplacesbyuserid);

router.post('/', [check('title').not().isEmpty(),check('description').isLength({min:5}),check(address).not().isEmpty()],placesControllers.createplace);

router.patch('/:pid',[check('title').not().isEmpty(),check('description').isLength({min:5})],placesControllers.updateplace);  //path is same as the get but doesnt matter since method is different

router.delete('/:pid',placesControllers.deleteplace);// all the things in side the brackets are middlewares

module.exports=router;