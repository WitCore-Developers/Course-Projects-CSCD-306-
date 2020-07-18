require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const passport = require("passport")
// const LocalStrategy = require("passport-local")
const session = require("express-session")
// const User = require("./models/User")
// const bcrypt = require("bcrypt")

const app = express()



//DB connection
mongoose.connect( process.env.DATABASE_URL, 
{
    useUnifiedTopology: true,
    useNewUrlParser:true
},
() => console.log("Connected to Db"))

//Importing ROutes
const mainRoute = require("./routes/main")
const authRoute = require("./routes/auth")
const propertyRoute = require("./routes/property")
const blogRoute = require("./routes/blog")


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/public", express.static(path.join(__dirname,"public")))
app.set('view engine','ejs');

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized: false
}))

require('./passport')(passport);
app.use(passport.initialize()) 
app.use(passport.session()) 

//Passpost


app.get("*", (req,res,next)=>{
    res.locals.user = req.user || null
    next();
})

//Adding Route middleware
app.use("/user", authRoute);
app.use("/", mainRoute);
app.use("/property", propertyRoute)
app.use("/blog", blogRoute)

//Starting Server
const port = process.env.PORT || 5000
app.listen(port, console.log(`Started on Port:${port}`))