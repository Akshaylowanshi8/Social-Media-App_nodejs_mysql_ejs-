const { User ,Post } = require('../models');
const bcrypt = require('bcrypt');


const signup =async(req, res)=>{

console.log('values===',req.body);

let  name  =req.body.fullName; 
let  email =req.body.email ;
let  bPassword = req.body.password ;
const saltRounds = 10;

if(!name ||!email ||!bPassword ){

  res.send("All fields are required!")
  return
}
try {
       // bycript password 
      const password = await bcrypt.hash(bPassword, saltRounds);
    //   console.log(password);
   await User.create({ name, password, email,}).then((data) => {
  res.status(200).redirect('/login')
  })
} catch (error) {
  res.status(500).redirect('/singup')
   console.error('Error creating student:', error);
}
}

const  login = async(req, res) => {
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
}

  const  logout=async(req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Logout failed');
        } else {
            res.redirect('/');
        }
    });
}


module.exports ={
signup,
login,
logout


}