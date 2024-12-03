const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    tiltle:{
        type:String,
        required:true
    },
    subhead:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    likeCount:{
        type:Number,
        
        
    },
    publishDate:{
        type: String
    },
    blogImg:{
        type:String,
        required:true
    },
    authorId:{
        type:String,
        required:true
    }
    
    
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs