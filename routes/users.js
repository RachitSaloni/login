const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);

router.post('/create',userController.create); //post because form is posting the data
//router.post('/createSession',userController.createSession);

router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'users/signIn'},
),userController.createSession);
router.get('/sign-out', userController.destroySession);

module.exports=router;