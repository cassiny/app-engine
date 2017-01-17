import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({

  // userId of owner of this project
  ownerId: { type: Schema.Types.ObjectId, index: true },
  // project name
  name: String,
  // description
  desc: String,
  // path, ususally the project name
  // should be unique
  path: { type: String, index: true },

  // git repository
  git: {
    repository: {
      url: String,
      username: String,
      password: String,
    },
    branch: { type: String, default: 'master' },
  },

  // TODO: Ref to image
  baseImage: { },

  createTime: { type: Date, default: Date.now },
  lastModifyTime: { type: Date, default: Date.now },
  // TODO: Build Schema
  lastBuild: { },

  applicationInstances: { },
  serviceInstance: { },
}, {
  collection: 'project',
});


export default mongoose.model('Project', projectSchema);


