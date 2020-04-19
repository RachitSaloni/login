const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authenticating useing passport
passport.use(new LocalStrategy({
           usernameField:'email'
},

//identifying the user
function(email,password,done){
    User.findOne({email:email}, function(err,user){
          if(err){ 
                 console.log("error in identifying user");
                 return done(err); 
                 }
        if(!user || user.password!= password){
            console.log("Invalid UserName/Password");
            return done(null,false);
        }

        //if user found
        return done(null,user);
    });
}
));

//serializing the user to decide which key is to be kept in cookies

passport.serializeUser(function(user,done){
   done(null,user.id);
});

//deserializing the user form the kry in the cookies

passport.deserializeUser(function(id,done){
  User.findById(id, function(err,user){
     if(err){
         console.log("error in finding user");
         return done(err);  
     }
     return done(null,user);
  });
});

//check if user is authenticated

passport.checkAuthentication=function(req,res,next){
    //if user is not signed In

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signIn');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
     next();
}
module.exports=passport;