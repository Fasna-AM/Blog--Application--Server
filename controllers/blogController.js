const authors = require('../models/authorsModel');
const blogs = require('../models/blogModel');


//addBlog
exports.addBlogController = async (req,res)=>{
    console.log("inside addBlogController");
    const {tiltle,subhead,description,category,publishDate} = req.body
    const authorId = req.authorId
    const blogImg = req.file.filename
    
    // console.log(tiltle,subhead,description,category,publishDate,blogImg,authorId);
    
    try{
        const newBlog = new blogs({
            tiltle,subhead,description,category,likeCount:0,publishDate,blogImg,authorId
        })
        await newBlog.save()
        res.status(200).json(newBlog)

    }catch(err){
        res.status(401).json(err)
    }
    
}

//getAllBlogs
exports.getAllBlogsController = async(req,res)=>{
    console.log("Inside getAllBlogsController");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        category:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allBlogs = await blogs.find(query).sort({publishDate:-1})
        res.status(200).json(allBlogs)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//getAuthorBlogs
exports.getAuthorBlogsController = async(req,res)=>{
    console.log("Inside getAuthorBlogsController");
    const {id} = req.params

    try{
        const autherBlogs = await blogs.find({authorId:id})
        // console.log(author);
        
        res.status(200).json(autherBlogs)
    }catch(err){
        res.status(401).json(err)
    }
}

//updateblog
exports.updateBlogController = async(req,res)=>{
    console.log("Inside updateBlogController");
    const {id} = req.params
    const authorId = req.authorId
    const {tiltle,subhead,description,category,likeCount,publishDate,blogImg} = req.body
    const reuploadBlogImg = req.file?req.file.filename:blogImg
    try{
        const updateBlog= await blogs.findByIdAndUpdate({_id:id},{
            tiltle,subhead,description,category,likeCount,publishDate,blogImg:reuploadBlogImg,authorId
        },{new:true})
        await updateBlog.save()
        res.status(200).json(updateBlog)

    }catch(err){
        res.status(401).json(err)
    }
    
}

//updateLike
exports.updateLikeController =async(req,res)=>{
    console.log("Inside updateLikeController");
    const {id} = req.params
    const authorId = req.authorId


    
    try{
        const blog = await blogs.findByIdAndUpdate({_id:id},{$inc:{likeCount:1}},{new:true})
        blog.save()
        // const likedBloger = await authors.findOne({_id:authorId})
        // const author = await authors.findByIdAndUpdate({_id:blog.authorId},{$push:{notifications:{blog:blog,bloger:likedBloger}}})
        // author.save()
        res.status(200).json(blog)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//updateUnLike
exports.updateUnLikeController =async(req,res)=>{
    console.log("Inside updateUnLikeController");
    const {id,likeCount} = req.params
    // console.log(req.body);
    
    
    try{

        const blog = await blogs.findByIdAndUpdate({_id:id},{$set:{likeCount:likeCount}},{new:true})
        blog.save()
        res.status(200).json(blog)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//deleteBlog
exports.deleteBlogController = async(req,res)=>{
    console.log("Inside deleteBlogController");
    const {id} = req.params
    try{
        const deleteBlog = await blogs.findByIdAndDelete({_id:id})
        res.status(200).json(deleteBlog)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//homeBlogs
exports.homeBlogsController = async(req,res)=>{
    console.log("Inside homeBlogsController");
    try{
        const blog = await blogs.find().limit(3)
        res.status(200).json(blog)

    }catch(err){
        res.status(401).json(err)
    }
    
}