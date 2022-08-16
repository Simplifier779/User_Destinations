const uuid=require('uuid');
const HttpError=require('../models/http-error');
const User=require('../models/user');
const {validationResult}=require('express-validation');
const DUMMY_USER=[{
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
}];

const getUsers=(req,res,next)=>{
    let users;
    //res.json({users:DUMMY_USER});
    try{
        users=User.find({},'-password'); //password is excluded
    }
    catch(err){
        return next(new HttpError('There is an error kid!',500));
    }
    res.json({users:users.map(user=>user.toObject({getters:true}))});
};

const signup=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('There is an error kid!',404));
    }
    let existingUser;
    const {name,email,password}=res.body; // body parser is used whenever data needs to be updated,data needs to be extrated or deleted.
    
    try{
        existingUser= await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError('There is an error kid!',500));
    }
    if(existingUser){
        return next(new HttpError('There is an error kid!',404));
    }
    const createdUser=new User({
        //id:uuid(),
        name:name,
        email,
        image:'linkkk',
        password,
        places:[]
    });
    //DUMMY_USER.push(createdUser);
    try{
        await createdUser.save(); //this is used in mongodb to save in the database
    }
    catch(err){
        return next(new HttpError('Error dude!',404));
    }
     
    res.status(201).json({user:createdUser.toObject({getters:true})});
};

const login=async (req,res,next)=>{
    const {email,password}=res.body;
    let existingUser;
    try{
        existingUser= await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError('There is an error kid!',500));
    }
    if(!existingUser || existingUser.password!==password){
        return next(new HttpError('Logging in failed!',401));
    }

    //const identifiedUser=DUMMY_USER.find(u=>u.email===email);
    //if(!identifiedUser || identifiedUser.password!==password){
    //    return next(new HttpError('Error bro',404));
    //}
    res.json({message:'logged in!'});
};

exports.getUsers=getUsers;
exports.signup=signup;
exports.login=login;