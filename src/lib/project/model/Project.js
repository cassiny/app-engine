import mongoose from 'mongoose';
import Joi from 'joi';

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

// -------------------------------
// Project validator Schema
// -------------------------------
const defaultProjectDesc = info => `Project ${info.name} is based on Node.js`;
defaultProjectDesc.description = 'generated description';


projectSchema.statics.projectInfoSchema = {
  name: Joi.string().min(1).trim().required(),

  desc: Joi.string().optional().default(defaultProjectDesc),

  path: Joi
  .string()
  .min(1)
  .max(64)
  .regex(/^\w+-?\w+(?!-)$/)
  .required(),
};

projectSchema.statics.gitInfoSchema = {
  url: Joi.string().uri({
    scheme: [
      'git',
      /https?/
    ]
  }),
};


// -------------------------------
// Dao operation
// -------------------------------

projectSchema.statics.getProjectsByUserId = async function query(userId) {
  const projectList = await this
  .find({ ownerId: userId })
  .select('-ownerId -git.username -git.password')
  .sort({ createTime: 'desc' })
  .exec();
  return projectList;
};


projectSchema.statics.existProject = async function query(userId, path) {
  const project = await this.findOne({ ownerId: userId, path }, 'id', { lean: true }).exec();
  return project !== null;
};

export default mongoose.model('Project', projectSchema);


