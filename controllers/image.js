// const fs = require("fs");
// const path = require("path");
// const { image } = require('../models');

// const uploadFiles = async (req, res) => {
//   try {
//     console.log(req.file);
//     if (req.file === undefined) {
//       return res.send('You must select a file.');
//     }
//     const filePath = path.join(__dirname, '../public/images', req.file.filename);
//     // Read file data
//     const fileData = fs.readFileSync(filePath);
//     // Save file data to database
//     const uploadedImage = await image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fileData,
//     });

//     // Write file data to a different location
//     const tmpPath = path.join(__dirname, '../public/images', uploadedImage.name);
//     fs.writeFileSync(tmpPath, uploadedImage.data);
//     const images = await image.findAll();
//     res.render('images', { images });
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying to upload images: ${error}`);
//   }
// };

// const getImages = async (req, res) => {
//   try {
//     // Fetch all images from the database
//     const images = await image.findAll();

//     // Render the EJS template and pass the images
//     res.render('images', { images });
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     res.send('Error fetching images.');
//   }
// };
  
// module.exports = {
//   uploadFiles,
//   getImages
// };
