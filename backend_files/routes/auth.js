const router = require("express").Router();
const User = require("./../models/User")
const {registerValidation, propertyValidation} = require("./../validation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const verification = require("./verification")
const path = require("path")
const passport = require("passport");
const verify = require("./verification");
const Property = require("../models/Property");


router.get("/register", (req,res)=>{
    res.render("register")
})

router.post("/register",async (req,res)=>{

    const {error} = registerValidation(req.body);

    if(error){
       return res.status(400).send(error.details[0].message)
    }

    //Checking if user exists in db
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword 
    })

    try{
        const savedUser = await user.save();
        res.status(201).render("/user/login")
    }catch(e){
        res.status(400).send(e)
    }
})


router.get("/login", (req,res)=>{
    res.render("login")
})

router.post("/login", passport.authenticate('local', { failureRedirect: '/user/login' }) , (req, res) =>{
    res.redirect("dashboard")
    
})


router.get("/dashboard", verify, (req,res)=>{
    res.render("dashboard");
})

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
})

router.get("/new_post", verify,(req,res)=>{
    res.render("new_post")
})

// router.post("/new_post", verify, async (req,res)=>{
//     const {error} = propertyValidation(req.body);

//     if(error){
//        return res.status(400).send(error.details[0].message)
//     }

//     const property = new Property({
//         category: req.body.category,
//         price: req.body.price,
//         size: req.body.size,
//         sizeUnit: req.body.sizeUnit,
//         city: req.body.city,
//         region: req.body.region,
//         imageURL: req.body.imageURL
//     })
    
//     try{
//         await property.save()
//         res.status(201).redirect('/user/dashboard')
//     }catch(e){
//         res.status(400).json({message:"Failed"})
//     }


// })


module.exports = router;
