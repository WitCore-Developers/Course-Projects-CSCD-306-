const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    category:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    size:{
        type: Number,
        required:true
    },
    size_unit:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true,
        max:1024
    },
    region:{
        type: String,
        required:true,
        max:1024
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

module.exports = mongoose.model("Property", propertySchema);