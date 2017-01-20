import mongoose from 'mongoose';

import BuildState from './BuildState';

const ObjectId = mongoose.Schema.Types.ObjectId;

const buildSchema = new mongoose.Schema({
  project: { type: ObjectId, ref: 'project' },
  revision: { type: String, index: true },
  hidden: { type: Boolean, default: true },
  git: {
    commit: {
      message: String,
      hash: String,
    },
    branch: { type: String, default: 'master' }
  },
  state: Number,
  image: { type: ObjectId, ref: 'image' },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
}, {
  collection: 'build'
});


// ----------------------------
// Dao operations
// -----------------------------
buildSchema.statics.getBuildsByProjectId = async function getBuildsByProjectId(projectId) {
  return this.find({ project: projectId, hidden: false }).sort({ startTime: 'desc' }).exec();
};

buildSchema.statics.getBuildRecordsByPath =
  async function getBuildRecordsByPath(userId, projectPath) {
    return this
    .find({ hidden: true })
    .populate({
      path: 'Project',
      match: {
        // path: projectPath,
        owner: userId,
      }
    })
    .sort({ startTime: 'desc' }).exec();
  };


buildSchema.statics.State = BuildState;


export default mongoose.model('Build', buildSchema);
