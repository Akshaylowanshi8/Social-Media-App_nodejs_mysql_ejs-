const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");


const userController = require('../controllers/userController')
router.get('/delPost/:id',userController.deletePost)
router.get('/updPost/:id',userController.updatePost)
router.get('/home',userController.allPost)
router.get('/postNew' ,userController.postNew)
router.post('/uploadPost',upload.single("file"),userController.uploadPost)
router.get('/myPost' ,userController.myPost)
router.post('/newComment', userController.newComment )
router.post('/saveUpdatePost',upload.single("file"),userController.saveUpdatePost)

module.exports = router;