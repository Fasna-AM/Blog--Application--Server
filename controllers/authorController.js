
const authors = require('../models/authorsModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


// register
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password, joinDate } = req.body
    try {

        const existingAuthor = await authors.findOne({ email })
        if (existingAuthor) {
            res.status(406).json("Already Existing Author...Please Login!!!")
        } else {
            const encryptPassword = await bcrypt.hash(password, 10)
            const newAuthor = new authors({
                username, email, password: encryptPassword, profileImg: "", Bio: "", youTube: "", instagram: "", facebook: "", twitter: "", github: "", linkedin: "", joinDate, notifications:[], favorites:[], likedBlogs:[]
            })
            newAuthor.save()
            res.status(200).json(newAuthor)
        }

    } catch (err) {
        console.log(err);

    }

}

// login 
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body
    try {
        const existingAuthor = await authors.findOne({ email })
        if (existingAuthor) {
            const decyptPassword = await bcrypt.compare(password, existingAuthor.password)
            if (decyptPassword) {
                //token generation
                const token = jwt.sign({ authorId: existingAuthor._id }, process.env.JWTPASSWORD)
                res.status(200).json({
                    author: existingAuthor,
                    token
                })

            } else {
                res.status(404).json("Invalid Password!!!")
            }

        } else {
            res.status(404).json("Invalid Email!!!")
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

// getuser
exports.getUserController = async (req, res) => {
    console.log("Inside getUserController");
    const { id } = req.params
    try {
        const author = await authors.findOne({ _id: id })
        // console.log(author);

        res.status(200).json(author)
    } catch (err) {
        res.status(401).json(err)
    }
}

//addFavorites
exports.addFavoritesController = async (req, res) => {
    console.log("Inside addFavoritesController");
    const { id } = req.params
    const { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId } = req.body
    const favorites = { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId }
    // console.log(favorites);

    try {
        const author = await authors.findOne({ _id: id })
        const blog = author.favorites.find(fav => fav._id == _id)
        if (blog) {
            // console.log(blog);
            
            res.status(406).json("Already added")
        } else {

            const updatedauthor = await authors.findByIdAndUpdate({ _id: id }, { $push: { favorites: favorites } }, { new: true })
            updatedauthor.save()
            // console.log(updatedauthor);

            res.status(200).json(updatedauthor)
            
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

//addLikedBlogs
exports.addLikedBlogController = async (req, res) => {
    console.log("Inside addLikedBlogController");
    const { id } = req.params
    const { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId } = req.body
    const likedBlogs = { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId }
    // console.log(favorites);

    try {
        const author = await authors.findOne({ _id: id })
        const blog = author.likedBlogs.find(fav => fav._id == _id)
        if (blog) {
            res.status(406).json("Already liked")
        } else {

            const updatedauthor = await authors.findByIdAndUpdate({ _id: id }, { $push: { likedBlogs: likedBlogs } }, { new: true })
            updatedauthor.save()
            res.status(200).json(updatedauthor)
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

//addNotification
exports.addNotificationController = async (req, res) => {
    console.log("Inside addNotificationController");
    const { id } = req.params
    const likeAuthor = req.authorId
    const author = await authors.findOne({ _id: likeAuthor})

    const { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId } = req.body
    const notifications = { _id, tiltle, subhead, description, category, likeCount, publishDate, blogImg, authorId, likeAuthor:author.username }
    // console.log(favorites);

    try {
        const author = await authors.findOne({ _id: id })
        if(id != likeAuthor){
            const updatedauthor = await authors.findByIdAndUpdate({ _id: id }, { $push: { notifications: notifications } }, { new: true })
            updatedauthor.save()
            res.status(200).json(updatedauthor)
        }
       


    } catch (err) {
        res.status(401).json(err)
    }

}

//removeNotification
exports.removeNotificationController = async(req,res)=>{
    console.log("Inside removeNotificationController");
    const id =req.authorId

    try{

        const author = await authors.findOne({_id:id})
        author.notifications.splice(0,author.notifications.length)
        author.save()
        res.status(200).json(author)
    }catch(err){
        res.status(401).json(err)
    }
    
}

//removeFavorites
exports.removeFavoritesController = async (req, res) => {
    console.log("Inside removeFavoritesController");
    const { id } = req.params

    const { _id } = req.body


    try {
        const author = await authors.findOne({ _id: id })
        const blog = author.favorites.find(fav => fav._id == _id)
        author.favorites.splice(author.favorites.indexOf(blog), 1)
        author.save()
        res.status(200).json(author)
    } catch (err) {
        res.status(401).json(err)
    }

}

//removelikeBlog
exports.removeLikeBlogController = async (req, res) => {
    console.log("Inside removeLikeBlogController");
    const { id } = req.params

    const { _id } = req.body


    try {
        const author = await authors.findOne({ _id: id })
        const blog = author.likedBlogs.find(fav => fav._id == _id)
        author.likedBlogs.splice(author.likedBlogs.indexOf(blog), 1)
        author.save()
        res.status(200).json(author)
    } catch (err) {
        res.status(401).json(err)
    }

}

//profileUpdate
exports.profileUpdateController = async (req, res) => {
    console.log("Inside profileUpdateController");
    const { username, email, password, profileImg, Bio, youTube, instagram, facebook, twitter, github, joinDate, notifications, favorites, likedBlogs } = req.body
    const uploadProfileImg = req.file ? req.file.filename : profileImg
    const authorId = req.authorId

    try {
        const updateAuthor = await authors.findByIdAndUpdate({ _id: authorId }, { username, email, password, profileImg: uploadProfileImg, Bio, youTube, instagram, facebook, twitter, github, joinDate, notifications, favorites, likedBlogs }, { new: true })
        await updateAuthor.save()
        res.status(200).json(updateAuthor)
    } catch (err) {
        res.status(401).json(err)
    }

}

//changePwd
exports.changePwdController = async (req, res) => {
    console.log("Inside changepwdController");
    const { id, currentpwd, newpwd } = req.params

    // console.log(id,currentpwd,newpwd);

    try {
        const author = await authors.findOne({ _id: id })
        // console.log(author);

        const decyptPassword = await bcrypt.compare(currentpwd, author.password)

        if (decyptPassword) {
            const encryptPassword = await bcrypt.hash(newpwd, 10)
            const updatedauthor = await authors.findByIdAndUpdate({ _id: id }, { $set: { password: encryptPassword } }, { new: true })
            await updatedauthor.save()
            res.status(200).json(updatedauthor)

        } else {
            res.status(404).json("Invalid Current Password!!!")
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

//forgetPassword
exports.forgetPasswordController = async (req, res) => {
    console.log("Inside forgetPasswordController");
    
    const { email } = req.body
    if (!email) {
        res.status(404).json("Please Provide Email")
    }
    const checkAuthor = await authors.findOne({ email })
    if (checkAuthor) {
        //token generation
        const token = jwt.sign({ authorId: checkAuthor._id }, process.env.JWTPASSWORD)

        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     secure: "true",
        //     auth: {
        //         user: process.env.MY_GAMIL,
        //         pass: process.env.MY_PASSWORD
        //     }
        // })
        // const receiver = {
        //     from: process.env.MY_GAMIL,
        //     to: email,
        //     subject: "Password Reset Request",
        //     text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`
        // }
        // await transporter.sendMail(receiver)
        // res.status(200).json("Password reset link send succeesfully on your gmail account")

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:"fasnaanas16@gmail.com",
              pass: "abchmukpgdmracah"
            }
          });
          
          var mailOptions = {
            from: "fasnaanas16@gmail.com",

            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    } else {
        res.status(404).json("Author not found please register")
    }
}
