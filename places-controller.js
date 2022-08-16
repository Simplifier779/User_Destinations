const HttpError=require('../models/http-error');
const uuid=require('uuid');
const moongoose=require('mongoose');
const {validationResult}=require('express-validation');
const User=require('../models/user');
const Place=require('../models/place');  //capital 'p' as this is a constructor function.

let DUMMY_PLACES=[   //let make a thing variable. const is used for a constant
    {
        id:'p1',
        title:'Empire State Building',
        description:'One of the most famous1',
        location:{
            lat:40.0232,
            lng:-73.98
        },
        address:'abcd',
        creator:'u1'
    }
];

const getplacebyid=async (req,res,next)=>{
    const placeId=req.params.pid;
    let place;
    //const place=DUMMY_PLACES.find(p=>{
    //    return p.id===placeId;
    //});
    try{
        place=await Place.findById(placeId).exec();  //exec makes find a real promise.
    }
    catch(err){
        return next(new HttpError('Error',500)); //this error is thrown when the request is not proper
    }
    if(!place){
        if(!place){
            throw new HttpError('error',404); //this error is thrown when the request is proper but the data is not present.
        }
    }
    else{
       res.json({place:place.toObject({getters:true})});
       //place object is converted into normal javascript object with the help of toObject() method. getters removes the underscore from the id
    }
};
//this can also be written as function getplacebyid(...)  OR const getplacebyid=function(){...}

const getplacesbyuserid= async (req,res,next)=>{
    const userId=req.params.uid;
    let places;
    try{
        places=await Place.find({creator: userId}).exec(); //find returns all the places in order to receive a specific place, user id is passed as an argument  //exec makes find a real promise.
    }
    catch(err){
        return next(new HttpError('Error',500)); //this error is thrown when the request is not proper
    }
    //const places=DUMMY_PLACES.filter(p=>{
    //    return creator.id===userId
    //});
    if(!places ||places.length===0){
        return next(new HttpError('error',404));//this error is thrown when the request is proper but the data is not present.
    }
    res.json({places:places.map(place=>place.toObject({getters:true}))}); //find returns an array therefore toObject method cannot be used here. array of objects is converted into jsx with the help of map.
};

const createplace =async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('There is an error kid!',404));
    }
    const {title,description,address,coordinates,image,creator}=req.body; //body parser takes the data that is filled in the form on the web page and not that is already present in the database. 
    //this is a shortcut for       const title=req.body.title;
    const createdPlace= new Place({
        title,//same as    title:title
        description,
        address,  
        location:coordinates,
        image:'4234324rwefF',
        creator 
    });
    let user;
    try{
        user= await User.findById(creator); //checking if user is present in the database 'User' doesnt contain creator. But since creator is referring to User, we can use this.
    }
    catch(err){
        return next(new HttpError('Error dude!',500));
    }
    if(!user){
        return next(new HttpError('User not found!',404));
    }
    //DUMMY_PLACES.push(createdPlace);(this is used for express js to save in the array)
    try{
        //await createdPlace.save(); //this is used in mongodb to save in the database
        const sess=await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session:sess}); // this provides us with a unique id(place id)
        user.places.push(createdPlace); //this adds the places id to the user
        await user.save({session:sess});
    }
    catch(err){
        return next(new HttpError('Error dude!',404));
    }
     
    res.status(201).json(createdPlace); //createdPlace:createdPlace    createdPlace is an object 
};

const updateplace= async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('There is an error kid!',404));
    }
    const {title,description}=req.body; //we are changing/updating with the help of this 
    const placeId=req.params.pid;
    let place;
    try{
        place=await Place.findById(placeId);
    }
    catch(err){
        return next(new HttpError('There is an error kid!',500));
    }
    //const updatedPlace={...DUMMY_PLACES.find(p=>placeId===p.id)}; //const stores the address of the boject and not the object itself
    //const placeIndex=DUMMY_PLACES.find(p=>placeId===p.id);

    //updatedPlace.title=title;
    //updatedPlace.description=description;
    place.title=title;
    place.description=description;
    //DUMMY_PLACES[placeIndex]=updatedPlace;
   

    try{
        await place.save();
    }
    catch(err){
        return next(new HttpError('There is an error kid!',500));
    }
    res.status(201).json({place:place.toObject({getters:true})});
};

const deleteplace=(req,res,next)=>{
    const placeId=req.params.pid;
    let place;
    try{
        place=await Place.findById(placeId).populate('creator'); //populate allows us to access documents of another collection and to work and make changes in the document. Populate can be used only if the two collections are connected. Here places and creator id have been connected so we can use populate.
    }
    catch(err){
        return next(new HttpError('Could not find the place!',500));
    }
    if(!place){
        return next(new HttpError('Could not find the place!',404));
    }
    try{
        const sess=await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session:sess});
        place.creator.places.pull(place);
        await place.creator.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){

    }
    //if(!DUMMY_PLACES.find(p=>p.id==placeId)){
    //    return next(new HttpError('Could not find the place!',404));
    //}
    //DUMMY_PLACES=DUMMY_PLACES.filter(p=>p.id!==placeId);
    //res.status(201).json({messgae:'deleted'});
};

exports.getplacebyid=getplacebyid;//pointer to that function is exported
exports.getplacesbyuserid=getplacesbyuserid;//pointer to that function is exported
exports.createplace=createplace;
exports.updateplace=updateplace;
exports.deleteplace=deleteplace;