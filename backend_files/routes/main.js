const router = require("express").Router()

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/about",(req,res)=>{
    res.render("about")
})

router.get("/listings",(req,res)=>{
    res.render("listings")
})

router.get("/blog",(req,res)=>{
    res.render("blog")
})

router.get("/contact",(req,res)=>{
    res.render("contact")
})




module.exports = router