const moongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.schema;

const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:6},
    image:{type:String,required:true},
    places:{type:mongoose.Types.ObjectId,required:true,ref:'Place'}
    //for transaction we need to create a collection. it is not created automatically 
});
//Steps:  schema--> model-->each instance of the model used for document
userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);  //(nameof the model(Always uppercase-this is also the table name but it will be plural and lowercase),schema that we want to refere to . in this case it is the placeSchema)