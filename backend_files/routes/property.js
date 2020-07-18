const router = require("express").Router()
const path = require("path")
const verify = require("./verification")
const {propertyValidation} = require("./../validation")
const multer = require("multer")

const Property = require("./../models/Property")

//Configuring Image Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,"../public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


//Get all properties from database
router.get("/", async (req,res) => {
    try{
        const properties = await Property.find()
        res.status(200).send(properties)
    }catch(e){
        res.status(500).redirect("/blog")
    }
})

//Get a property from database
router.get("/:propertyId", async (req,res) => {
    const id = req.params.propertyId
    try{
        const property = await Property.find({_id:id})
        res.status(200).send(property)
    }catch(e){
        res.status(500).send(e)
    }
})

//Add a property to db
router.post("/", verify, upload.single('img'), async (req,res) => {
    try{
        req.body.imageURL = req.file.path
        const {error} = propertyValidation(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        const property = new Property({
            category: req.body.category,
            price: req.body.price,
            size: req.body.size,
            size_unit: req.body.size_unit,
            city: req.body.city,
            region: req.body.region,
            imageURL: req.body.imageURL
        })

    
        const savedProperty = await property.save()
        res.status(201).redirect("/user/dashboard")
    }catch(e){
        res.status(400).send(e)
    }

})

//Edit a property
router.put("/:propertyId", verify, upload.single('img'), async (req,res) => {
    req.body.imageURL = req.file.path
    const {error} = propertyValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const property = {
        category: req.body.category,
        price: req.body.price,
        size: req.body.size,
        sizeUnit: req.body.sizeUnit,
        city: req.body.city,
        region: req.body.region,
        imageURL: req.body.imageURL
    }

    try{
        const updatedProperty = await Property.findByIdAndUpdate(req.params.propertyId, property)
        res.status(204).send(updatedProperty)

    }catch(e){
        res.status(400).send(e)
    }

})

//Delete a property
router.delete("/:propertyId", verify, async (req,res) => {
    const id = req.body.id
    try{
        await Property.findByIdAndDelete(id)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router