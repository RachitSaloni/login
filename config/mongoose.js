const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test_demo'); //connect to db

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in connection')); //connection failure

//when connection is successful

db.once('open',function(){
console.log("sucessfully connected to db");
});

module.exports=db;