
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    Bio: {
        type: String,
    },
    youTube: {
        type: String,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },                              
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    joinDate: {
        type: String
    },
    notifications:[],
    favorites:[],
    likedBlogs:[]
})

const authors = mongoose.model("authors",authorSchema)
module.exports = authors
