
const express = require('express')
const authorController = require('../controllers/authorController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMidddleware = require('../middlewares/multerMiddleware')
const blogController = require('../controllers/blogController')

const router = new express.Router()

//register 
router.post('/register',authorController.registerController)

// login
router.post('/login',authorController.loginController)

//addBlog
router.post('/addBlog',jwtMiddleware,multerMidddleware.single('blogImg'),blogController.addBlogController)

//getallblogs
router.get('/getallblogs',jwtMiddleware,blogController.getAllBlogsController)

//getUser
router.get('/author/:id',jwtMiddleware,authorController.getUserController)

//getAutherBlogs
router.get('/blogs/:id',jwtMiddleware,blogController.getAuthorBlogsController)

//updateblog
router.put('/blogs/:id/updateBlog',jwtMiddleware,multerMidddleware.single('blogImg'),blogController.updateBlogController)

//updateLike
router.put('/blogs/:id/updateLike',jwtMiddleware,blogController.updateLikeController)

//updateUnLike
router.put('/blogs/:id/:likeCount/updateUnLike',jwtMiddleware,blogController.updateUnLikeController)

//addFavorites
router.put('/author/:id/addfavorite',jwtMiddleware,authorController.addFavoritesController)

//addlikeBlog
router.put('/author/:id/addlikeBlog',jwtMiddleware,authorController.addLikedBlogController)

//addnotification
router.put('/author/:id/addnotification',jwtMiddleware,authorController.addNotificationController)

//removeNotification
router.put('/author/removeNotification',jwtMiddleware,authorController.removeNotificationController)

//removeFavorites
router.put('/author/:id/removefavorite',jwtMiddleware,authorController.removeFavoritesController)

//removelikeBlog
router.put('/author/:id/removelikeBlog',jwtMiddleware,authorController.removeLikeBlogController)

//profileUpdate
router.put('/editProfile',jwtMiddleware,multerMidddleware.single('profileImg'),authorController.profileUpdateController)

//deleteBlog
router.delete(`/blogs/:id/delete`,jwtMiddleware,blogController.deleteBlogController)

//changePwd
router.post('/authors/:id/:currentpwd/:newpwd/changePwd',jwtMiddleware,authorController.changePwdController)

//forgetpassword
router.post("/forget-password",authorController.forgetPasswordController)

//homeblog
router.get("/homeblog",blogController.homeBlogsController)


module.exports = router
