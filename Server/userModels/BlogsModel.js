import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: [String], default: []},
  intoduction:{ type: String, required: true, trim: true },
  content: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
