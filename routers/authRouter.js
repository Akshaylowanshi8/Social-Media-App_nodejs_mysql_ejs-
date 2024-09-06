const express = require('express');
const router = express.Router();
const { User ,Post } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');
const authCon=require('../controllers/authController')
// Render login page
router.get('/login', (req, res) => {res.render('login')});
router.post('/signup',authCon.signup)
router.post('/login',authCon.login)
router.get('/logout',authCon.logout);
router.get('/', isAuthenticated, async(req, res) => {

        const post = await Post.findAll();
        const sess= await req.session.username ;
// console.log(post);
    res.render('home', {  username: sess,data:post}); 
});

module.exports = router;
