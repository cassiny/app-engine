import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ImageSchema = new mongoose.Schema({
  tag: { type: String },
  version: { type: String },
  owner: { type: ObjectId, ref: 'user' },
  createTime: { type: Date, default: Date.now }
}, {
  collection: 'image'
});

export default mongoose.model('Image', ImageSchema);
