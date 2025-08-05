import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String,  required: true},
  location:{type:String, required: true},
  Speaker: { type: String, required: true},
  thumbnail: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now}
});

const Event = mongoose.model('events', EventSchema);

export default Event;
