const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User ,Post } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Render login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            // Await bcrypt.compare
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.loggedIn = true;
                req.session.username = email;  
                req.session.save()
                
                // Use username consistently
                // console.log('Session after login:', req.session);
                res.redirect('/user/home')
            } else {
                res.send('Incorrect username or password');
            }
        } else {
            res.send('Incorrect username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/', isAuthenticated, async(req, res) => {

        const post = await Post.findAll();
        const sess= await req.session.username ;
// console.log(post);
    res.render('home', {  username: sess,data:post}); 
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Logout failed');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
