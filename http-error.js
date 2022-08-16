class HttpError extends Error{
    constructor(message,errorCode){
        super(message); //calls the constructor of the base class i.e. the error class in this case. //Adds message property
        this.code=errorCode;//adds the code property
    }
}

module.exports=HttpError;