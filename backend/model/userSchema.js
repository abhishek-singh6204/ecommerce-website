const mongoose=require("mongoose");
// const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,

    },
    role:{
        type:String,
        default:"user"
    }
});

// userSchema.plugin(passportLocalMongoose);
const User=mongoose.model("User",userSchema);
module.exports=User; 