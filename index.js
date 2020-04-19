const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose'); //importing the db
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_startegy');
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded()); //middleware for parsing the data
app.use(cookieParser());
app.use(expressLayouts); //to use partials and layouts 
app.use(express.static('./assets')); //setting up static page of assets

app.set('view engine','ejs'); //setting up view engine
app.set('views','views'); //setting up path for views

// mongo store is used to store the session cookie in the db

app.use(session({
    name:'test',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie :{
        maxAge:(1000*60*100)
    },
    
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes')); //defining path for routes

app.listen(port,function(err){
if(err){console.log(`error:${err}`);}
console.log(`server is up and running on port : ${port}`);
});