import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import Blog from './userModels/BlogsModel.js'
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import User from './userModels/UserModel.js';



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));



const app = express();
const port = process.env.PORT || 3000;
const Eusername = process.env.USER_NAME;
const Epassword = process.env.PASSWORD;

const storage = multer.diskStorage({
  destination: '../public/upload',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });


app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    if((username === Eusername) && (password === Epassword)){
         res.status(200).json({ message: 'Hello from backend!', islogin: true});
    }
    else{
        res.status(200).json({message:'Invalid username or password!', islogin: false});
    }
})


 app.get('/api/getuserpro', async (req, res) => {
  try {
    const user = await User.findOne();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.put("/api/updateuserpro", async (req, res) => {
  const { username, email, contact } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { username, contact },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




app.post("/api/addblogs",upload.single('blogThumb'), async(req, res) => {

  try{
    const { BlogTitle, blogintro, blogdesc, blogCategory } = req.body;
    const imagePath = req.file ? req.file.path : '';

      console.log("Received Blog:", BlogTitle, blogintro, blogdesc, blogCategory);

      const newBlog = new Blog({
          title: BlogTitle,
          content: blogdesc,
          category: blogCategory.split(','),
          intoduction: blogintro,
          thumbnail: imagePath,
        });

        await newBlog.save();

      res.status(201).json({
          message: 'Blog saved successfully',
          blog: newBlog,
          blogcreated: true,
        });

  }catch(err){
    console.error('Error saving blog:', error);
    res.status(500).json({ error: 'Failed to save blog' });
  }
  
});



app.get("/api/allblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/api/geteditblog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json({ blog });
});



app.put("/api/updateblog/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, intoduction, content, category } = req.body;
    const existingBlog = await Blog.findById(req.params.id);

    const updatedData = {
      title,
      intoduction,
      content,
      category: JSON.parse(category),
    };
    if (req.file) {
      if (existingBlog.thumbnail) {
        const oldImagePath = path.join(process.cwd(), existingBlog.thumbnail);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.thumbnail = `../public/upload/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json({ message: "Updated successfully", blog: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});




app.delete("/api/blogsdelete/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.thumbnail) {
      const imagePath = path.join(process.cwd(), blog.thumbnail);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog and thumbnail deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})