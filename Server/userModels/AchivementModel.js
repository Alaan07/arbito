import mongoose from 'mongoose';

const AchivementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now}
});

const Achivement = mongoose.model('achivements', AchivementSchema);

export default Achivement;
