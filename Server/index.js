import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import Blog from './userModels/BlogsModel.js'
import multer from 'multer';



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));



const app = express();
const port = process.env.PORT || 3000;
const Eusername = process.env.USER_NAME;
const Epassword = process.env.PASSWORD;

const storage = multer.diskStorage({
  destination: './upload',
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



app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})