const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    },
    imageURL:{
        type: String,
        required:true
    },
    dateAdded:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Blog", blogSchema);