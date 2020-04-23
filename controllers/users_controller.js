const User=require('../models/user'); //importing the user from model
module.exports.profile=function(req,res){
   /* return res.render('users',{
        title:"Profile"
    });*/

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){ console.log("error in finding user"); return ;}

            if(user){
                return res.render('users',{
                    title:"Profile",
                    user:user
                });
            }
        
    
    return res.redirect('/users/signIn');
});
    }
    else{
        return res.redirect('/users/signIn');
    }
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_up',{
        title:"Sign Up"
    });
}

module.exports.signIn=function(req,res){
    return res.render('users_sign_in',{
        title:"Sign IN"
    });
}

module.exports.create=function(req,res){
if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
}
User.findOne({email:req.body.email},function(err,user){
if(err){ console.log("error in finding user"); return ;}

if(!user){
    User.create(req.body,function(err,user){
        if(err){ console.log("error in creating user"); return ;}
        return res.redirect('/users/signIn');

    });
}
else{
    return res.redirect('back');
}
});
}

module.exports.createSession=function(req,res){
    //find user
  /*  User.findOne({email:req.body.email},function(err,user){
        if(err){ console.log("error in finding user"); return ;}

        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookies('user_id',user.id);
            return res.redirect('/users');
        }
        else{
            return res.redirect('back');
        }
    });*/
    return res.redirect('/');
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success',"Logged in successfully");
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}