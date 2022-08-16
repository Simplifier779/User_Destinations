const moongoose=require('mongoose');

const Schema=mongoose.schema;

const placeSchema=new Schema({
    title:{type:String, reqired:true},
    description: {type:String, reqired:true},
    imagee:{type:String, reqired:true},
    address:{type:String, reqired:true},
    location:{
        lat:{type:Number, reqired:true},
        lng:{type:Number, reqired:true},
    },
    creator:{type:mongoose.Types.ObjectId,required:true,ref:'User'} //ref property allows us to establish relation between two schemas
});//Types.ObjectId provides a id to the creator
//Steps:  schema--> model-->each instance of the model used for document

module.exports=mongoose.model('Place',placeSchema);  //(nameof the model(Always uppercase-this is also the table name but it will be plural and lowwercase),schema that we want to refere to . in this case it is the placeSchema)