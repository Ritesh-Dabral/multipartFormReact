var mongoose        = require('mongoose'),
    mongo_need_obj  = {
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useCreateIndex: true,
                        useUnifiedTopology:true,
                    }

                    
const URI = "mongodb+srv://himanshu:Him@1234@cluster0.ymyno.azure.mongodb.net/addUsers?retryWrites=true&w=majority";

mongoose.connect(URI,mongo_need_obj, function(err,db_response){
    if(err){
        console.log(err);
    }
    else {
        console.log('connected to Users');
    }
});

var user_schema = new mongoose.Schema({
    fname: String,
    lname: String, 
    email: String,
    contact: String,
    ImageData: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        size: String,
    }
});

module.exports = User = mongoose.model("users",user_schema);