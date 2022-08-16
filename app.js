const express=require('express');
const bodyParser=require('body-parser');
const HttpError=require('../models/http-error');
const placeRoutes=require('./routes/places-route');
const userRoutes=require('./routes/users-routes');
const mongoose=require('mongoose');

const app=express();
app.use(bodyParser.json());

app.use('/api/places',placeRoutes);
app.use('/api/users',userRoutes);

app.use((req,res,next)=>{
    const error=new HttpError('Could not find the route',404);
    throw error;
});
app.use((error,req,res,next)=>{    //error handler special middleware
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500)
    res.json({message:error.message|| 'an unknown error occured!'});
});

mongoose.connect('link').then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
});

// each instance of the model that is created in mongodb will result in a document creation.