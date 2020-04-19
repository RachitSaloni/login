const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
email:{
    type:String,
    reuired:true,
    unique:true
},
password:{
    type:String,
    reuired:true
},
name:{
    type:String
}
});

const User=mongoose.model('User',userSchema);

module.exports=User;