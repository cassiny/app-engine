import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: { type: String, index: true },
  nickname: { type: String },
  email: { type: String, index: true },
  password: { type: String },
  registerTime: { type: Date, default: Date.now },
}, {
  collection: 'user',
});

schema.statics.findOneByEmail = function findOneByEmail(email, cb) {
  return this.findOne({ email: email.toLowerCase() }, cb);
};

schema.statics.findOneByUsername = function findOneByUsername(username, cb) {
  return this.findOne({ username: username.toLowerCase() }, cb);
};

export default mongoose.model('User', schema);
