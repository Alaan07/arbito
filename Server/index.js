import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import Blog from './userModels/BlogsModel.js';
import multer from 'multer';
import fs from 'fs';
import User from './userModels/UserModel.js';
import Achivement from './userModels/AchivementModel.js'
import Event from './userModels/EventModel.js'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('server/.env') });

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

const app = express();
const port = process.env.PORT || 3000;
const Eusername = process.env.USER_NAME;
const Epassword = process.env.PASSWORD;


// 🔄 Dynamic storage destination based on uploadType
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType =
      req.query.uploadType?.toLowerCase() || req.body.uploadType?.toLowerCase() || 'misc';

    const uploadPath = path.join(process.cwd(), 'public', 'upload', uploadType);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });








app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 📂 Serve static files from /public/upload
app.use('/upload', express.static(path.join(process.cwd(), 'public', 'upload')));






// ****************************************************POST************************************



// 🔐 Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === Eusername && password === Epassword) {
    res.status(200).json({ message: 'Hello from backend!', islogin: true });
  } else {
    res.status(200).json({ message: 'Invalid username or password!', islogin: false });
  }
});




// 📝 Add events (with image)
app.post("/api/addevents", upload.single('eventThumb'), async (req, res) => {
  try {
    const { EventTitle, eventdesc, startdate, enddate, location, speaker } = req.body;

    const uploadType = req.query.uploadType?.toLowerCase() || 'misc'; // 💡 use this to set correct path
    const imagePath = req.file ? `/upload/${uploadType}/${req.file.filename}` : '';

    const newEvent = new Event({
      title: EventTitle,
      content: eventdesc,
      startdate: startdate,
      enddate: enddate,
      location: location,
      Speaker: speaker,
      thumbnail: imagePath,
    });

    await newEvent.save();
    res.status(201).json({
      message: 'Event saved successfully',
      event: newEvent,
      eventcreated: true,
    });

  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ error: 'Failed to save event' });
  }
});



// 📝 Add achivements (with image)
app.post("/api/addachivement", upload.single('achivementimg'), async (req, res) => {
  try {
    const { AchivementTitle, achivementdesc } = req.body;

    const uploadType = req.query.uploadType?.toLowerCase() || 'misc'; // 💡 use this to set correct path
    const imagePath = req.file ? `/upload/${uploadType}/${req.file.filename}` : '';

    const newAchivement = new Achivement({
      title: AchivementTitle,
      content: achivementdesc,
      thumbnail: imagePath,
    });

    await newAchivement.save();
    res.status(201).json({
      message: 'Achivement saved successfully',
      achivement: newAchivement,
      achivementcreated: true,
    });

  } catch (error) {
    console.error('Error saving achivement:', error);
    res.status(500).json({ error: 'Failed to save achivement' });
  }
});



// 📝 Add blog (with image)
app.post("/api/addblogs", upload.single('blogThumb'), async (req, res) => {
  try {
    const { BlogTitle, blogintro, blogdesc, blogCategory, uploadType } = req.body;

    const folder = uploadType?.toLowerCase() || 'misc';
    const imagePath = req.file ? `/upload/${folder}/${req.file.filename}` : '';

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
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ error: 'Failed to save blog' });
  }
});



// ************************GETS**********************************************************



// 👤 Get user profile
app.get('/api/getuserpro', async (req, res) => {
  try {
    const user = await User.findOne();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// 📚 Get all blogs
app.get("/api/allblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔁 Duplicate endpoint? Consider removing one
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/api/achivementsdashboard", async (req, res) => {
  try {
    const achivements = await Achivement.find();
    res.status(200).json(achivements);
  } catch (error) {
    console.error("Error fetching achivements:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/eventsdashboard", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// ✏️ Get blog by ID (for editing)
app.get("/api/geteditblog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json({ blog });
});


app.get("/api/geteditachivement/:id", async (req, res) => {
  const achivements = await Achivement.findById(req.params.id);
  if (!achivements) return res.status(404).json({ message: "Not found" });
  res.json({ achivements });
});

app.get("/api/geteditevents/:id", async (req, res) => {
  const events = await Event.findById(req.params.id);
  if (!events) return res.status(404).json({ message: "Not found" });
  res.json({ events });
});






// *******************************************update*************************************





// ✏️ Update user profile
app.put("/api/updateuserpro", async (req, res) => {
  const { _id, username, email, contact, password } = req.body;
  if (!_id) return res.status(400).json({ message: "User ID is required" });

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      username, email, contact, password
    }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// ✏️ Update events (with optional image)
app.put("/api/updateevents/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, content, startdate, enddate, location, speaker, uploadType } = req.body;
    const existingEvents = await Event.findById(req.params.id);

    const updatedData = {
      title,
      content,
      startdate,
      enddate,
      location,
      speaker,
    };
    if (req.file) {
      if (existingEvents.thumbnail) {
        const relativePath = existingEvents.thumbnail.startsWith('/')
          ? existingEvents.thumbnail.slice(1)
          : existingEvents.thumbnail;

        const oldImagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("🗑️ Old image deleted:", oldImagePath);
        } else {
          console.warn("⚠️ Old image not found:", oldImagePath);
        }
      }

      const folder = uploadType?.toLowerCase() || 'misc';
      updatedData.thumbnail = `/upload/${folder}/${req.file.filename}`;
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Updated successfully", event: updated });

  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});












// ✏️ Update achivement (with optional image)
app.put("/api/updateachivements/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, content, uploadType } = req.body;
    const existingAchivement = await Achivement.findById(req.params.id);

    const updatedData = {
      title,
      content,
    };
    if (req.file) {
      if (existingAchivement.thumbnail) {
        const relativePath = existingAchivement.thumbnail.startsWith('/')
          ? existingAchivement.thumbnail.slice(1)
          : existingAchivement.thumbnail;

        const oldImagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("🗑️ Old image deleted:", oldImagePath);
        } else {
          console.warn("⚠️ Old image not found:", oldImagePath);
        }
      }

      const folder = uploadType?.toLowerCase() || 'misc';
      updatedData.thumbnail = `/upload/${folder}/${req.file.filename}`;
    }

    const updated = await Achivement.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Updated successfully", achivement: updated });

  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});







// ✏️ Update blog (with optional image)
app.put("/api/updateblog/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, intoduction, content, category, uploadType } = req.body;
    const existingBlog = await Blog.findById(req.params.id);

    const updatedData = {
      title,
      intoduction,
      content,
      category: JSON.parse(category),
    };
    if (req.file) {
      if (existingBlog.thumbnail) {
        const relativePath = existingBlog.thumbnail.startsWith('/')
          ? existingBlog.thumbnail.slice(1)
          : existingBlog.thumbnail;

        const oldImagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("🗑️ Old image deleted:", oldImagePath);
        } else {
          console.warn("⚠️ Old image not found:", oldImagePath);
        }
      }

      const folder = uploadType?.toLowerCase() || 'misc';
      updatedData.thumbnail = `/upload/${folder}/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Updated successfully", blog: updated });

  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});








// ********************************************DELETE***********************************




app.delete("/api/eventsdelete/:deleteId", async (req, res) => {
  const { deleteId } = req.params;

  // ✅ Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(deleteId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const events = await Event.findById(deleteId);
    if (!events) return res.status(404).json({ message: "events not found" });

    if (events.thumbnail) {
      const relativePath = events.thumbnail.startsWith('/')
        ? events.thumbnail.slice(1)
        : events.thumbnail;

      const imagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image deleted:", imagePath);
      } else {
        console.warn("⚠️ Image not found:", imagePath);
      }
    }

    await Event.findByIdAndDelete(deleteId);
    res.status(200).json({ message: "events and thumbnail deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});






app.delete("/api/achivementsdelete/:deleteId", async (req, res) => {
  const { deleteId } = req.params;

  // ✅ Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(deleteId)) {
    return res.status(400).json({ message: "Invalid achievement ID" });
  }

  try {
    const achivements = await Achivement.findById(deleteId);
    if (!achivements) return res.status(404).json({ message: "Achievement not found" });

    if (achivements.thumbnail) {
      const relativePath = achivements.thumbnail.startsWith('/')
        ? achivements.thumbnail.slice(1)
        : achivements.thumbnail;

      const imagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image deleted:", imagePath);
      } else {
        console.warn("⚠️ Image not found:", imagePath);
      }
    }

    await Achivement.findByIdAndDelete(deleteId);
    res.status(200).json({ message: "Achievement and thumbnail deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});





app.delete("/api/blogsdelete/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.thumbnail) {
      // blog.thumbnail is like "/upload/blogs/xyz.jpg"
      const relativePath = blog.thumbnail.startsWith('/')
        ? blog.thumbnail.slice(1) // remove leading slash
        : blog.thumbnail;

      const imagePath = path.join(process.cwd(), "public", "upload", relativePath.replace(/^upload[\/\\]/, ""));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑️ Image deleted:", imagePath);
      } else {
        console.warn("⚠️ Image not found:", imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog and thumbnail deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
