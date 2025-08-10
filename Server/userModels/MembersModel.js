import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role:{ type: String, trim: true},
  university: { type: String, required: true },
  discription: { type: String, default:""},
  linkedin: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now}
});

const Member = mongoose.model('members', MemberSchema);

export default Member;
