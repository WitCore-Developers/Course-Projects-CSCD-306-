const router = require("express").Router()
const path = require("path")
const verify = require("./verification")
const {blogValidation} = require("./../validation")
const multer = require("multer")

const Blog = require("./../models/Blog")

//Configuring Image Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
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


//Get all Blogs from database
router.get("/", async (req,res) => {
    try{
        const blogs = await Blog.find()
        res.status(200).send(blogs)
    }catch(e){
        res.status(500).send(e)
    }
})

//Get a blog from database
router.get("/:blogId", async (req,res) => {
    const id = req.params.blogId
    try{
        const blog = await Blog.find({_id:id})
        res.status(200).send(blog)
    }catch(e){
        res.status(500).send(e)
    }
})

//Add a blog to db
router.post("/", verify, upload.single('image'), async (req,res) => {
    req.body.imageURL = req.file.path
    const {error} = blogValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        body: req.body.body,
        imageURL: req.body.imageURL
    })

    try{
        const savedBlog = await blog.save()
        res.status(201).send({blog: savedBlog._id, })
    }catch(e){
        res.status(400).send(e)
    }

})

//Edit a blog
router.put("/:blogId", verify, upload.single('image'), async (req,res) => {
    req.body.imageURL = req.file.path
    const {error} = blogValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const blog = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        body: req.body.body,
        imageURL: req.body.imageURL
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, blog)
        res.status(204).send(updatedBlog)

    }catch(e){
        res.status(400).send(e)
    }

})

//Delete a blog
router.delete("/:blogId", verify, async (req,res) => {
    const id = req.body.id
    try{
        await Blog.findByIdAndDelete(id)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router