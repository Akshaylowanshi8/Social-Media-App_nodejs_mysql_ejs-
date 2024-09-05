require('dotenv').config();
const express = require('express')
const app = express()
const session = require('express-session');
const port = process.env.PORT 
const bodyparser = require('body-parser');
app.use(express.static("public"));

// this is a body pata convert data in json 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
}));

app.set("view engine", "ejs");

app.get("/", (req, res)=> {
  res.redirect('/user/home')
})

 const userRoute=require('./routers/user')
app.use('/user',userRoute)

const commonRoute=require('./routers/common')
app.use('/',commonRoute)

const authRoutes = require('./routers/authRouter');
app.use('/', authRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
