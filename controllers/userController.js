const fs = require("fs");
const path = require("path");
const { Post, User, Comments } = require("../models");
const { Op, where } = require("sequelize");
const { cloneDeep } = require("sequelize/lib/utils");

const postNew = async (req, res) => {
  res.render("postNew");
};
const uploadPost = async (req, res) => {
  try {  
    const email = await req.session.username;
    const userdata = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userdata) {
      // console.log(req.file);
      if (req.file === undefined) {
        return res.redirect('/user/postNew');
      }
      const filePath = path.join(
        __dirname,
        "../public/images",
        req.file.filename
      );

      const fileData = fs.readFileSync(filePath);

      // Save file data to database
      const uploadedImage = await Post.create({
        type: req.body.type,
        name: req.file.originalname,
        data: fileData,
        userId: userdata.id,
        Description: req.body.Description,
      });
      // Write file data to a different location
      const tmpPath = path.join(
        __dirname,
        "../public/images",
        uploadedImage.name
      );
      fs.writeFileSync(tmpPath, uploadedImage.data);
      // res.render('images', { images });
      res.redirect("/");
    }
  } catch (error) {
    // console.log(error);
    return res.send(`Error when trying to upload images: ${error}`);
  }
};

const myPost = async (req, res) => {
  try {
    const email = req.session.username;
    const userdata = await User.findOne({
      where: { email },
      include: {
        model: Post,
        as: "posts",
      },
    });

    if (userdata) {
      // Convert binary data to base64 for rendering in templates
      userdata.posts = userdata.posts.map((post) => ({
        ...post.toJSON(), // Convert sequelize instance to plain object
        data: post.data.toString("base64"),
      }));

      res.render("myPost", { user: userdata });
    } else {
      res.status(404).send("User not found.");
      
    }
  } catch (error) {
        res.status(500).redirect('/login');
  }
};

const allPost = async (req, res) => {
  const allpost = await Post.findAll({
    where: {
             type: {
                      [Op.ne]: 'private' 
                  }
             },
    include: [
                {
                   model: User,
                    as: 'user', 
                 },
              {
                model: Comments,
                as: 'Comment',                                                         
               include: [
                          {
                           model: User,
                            as: 'user'
                           }
                        ]
              },
            ],
  });

  if (allpost) {
   
                  allpost.posts = allpost.map((post) => ({
                 ...post.toJSON(),
                    data: post.data.toString("base64"),
                   }));
 
                    res.render("home", {
                                  username: req.session.username,
                                  posts: allpost,
                               });
                 } 
  else {
          
       res.status(404).send("User not found.");
     
      }
};
const newComment=async(req,res)=>{

try {
  const email = await  req.session.username;
  const userdata = await User.findOne({
    where: {
      email: email,
    } 
  })

  if(userdata){
const comment = await Comments.create({
  userId:userdata.id,
  content:req.body.content,
  postId:req.body.postId,
})

res.redirect('/')

  }
} catch (error) {
  console.log(error);
  res.send(error)
}}
const deletePost=async(req,res)=>{

  try {
    const id=req.params.id;
    let data = await Post.destroy({
        where: {
            id: id
        }
    });
    console.log(data);
    if (data === 1) {
      res.status(200).redirect("/user/myPost")
    }
} catch (error) 
{
  console.log(error);
} 
} 

const updatePost=async(req,res)=>{
try {
  const id=req.params.id;
  let post = await Post.findOne({
      where: {
          id: id
      }
  });


  console.log(post);
  res.render('updatePost',{data:post})

} catch (error) {
  console.log(error); 
}
}
const saveUpdatePost=async(req,res)=>{

try {

 const id = req.body .id
 
console.log(req.body);
if (req.file === undefined) {
const uploadedImage = await Post.update({
  type: req.body.type,
  Description: req.body.Description,
},
{
  where:{
    id:id
  }
}
);

res.redirect("/");
}

else{

   // console.log(req.file);
   if (req.file === undefined) {
    return res.redirect('/user/postNew');
  }
  const filePath = await path.join(
    __dirname,
    "../public/images",
    req.file.filename
  );

  const fileData = await fs.readFileSync(filePath);


    await Post.update({
    type: req.body.type,
    name: req.file.originalname,
    data: fileData,
    Description: req.body.Description,
  },{
    where:{
      id:id
    }
  }

);
  
  const tmpPath = path.join(
    __dirname,
    "../public/images",
    req.file.originalname
  );
  fs.writeFileSync(tmpPath, fileData);
  res.redirect("/");
}

}

catch (error) {
  console.log(error);
}

}
module.exports = {
  postNew,
  uploadPost,
  myPost,
  allPost,
  newComment,
  deletePost,
  updatePost,
  saveUpdatePost
}
