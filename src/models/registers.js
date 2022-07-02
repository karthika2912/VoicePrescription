const mongoose=require("mongoose")
const doctorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
   password:{
    type:String,
    required:true
    },
    fullname:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
                                    
                            
                                       
})


//create collection
const Register=new mongoose.model("Register",doctorSchema);
module.exports=Register;