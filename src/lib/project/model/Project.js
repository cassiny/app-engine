import mongoose from 'mongoose';
import Joi from 'joi';

import applicationInstanceSchema from './ApplicationInstance';
import serviceInstanceSchema from './ServiceInstance';
import InstancesState from './InstanceState';

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

  baseImage: { type: mongoose.Schema.Types.ObjectId, ref: 'image' },

  createTime: { type: Date, default: Date.now },
  lastModifyTime: { type: Date, default: Date.now },
  // TODO: Build Schema
  lastBuild: { },

  applicationInstances: [applicationInstanceSchema],
  serviceInstances: [serviceInstanceSchema],
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

projectSchema.statics.getProjectsByUserId = async function getProjectsByUserId(userId) {
  const projectList = await this
  .find({ ownerId: userId })
  .select('-ownerId -git.username -git.password')
  .sort({ createTime: 'desc' })
  .exec();
  return projectList;
};

projectSchema.statics.getProjectByPath =
async function getProjectByPath(userId, path, lean = true) {
  const project = await this.findOne({ ownerId: userId, path }, '-ownerId -git.username -git.password', { lean }).exec();
  return project;
};

projectSchema.statics.existProject = async function existProject(userId, path) {
  const project = await this.findOne({ ownerId: userId, path }, 'id', { lean: true }).exec();
  return project !== null;
};

// export instances state
projectSchema.statics.InstancesState = InstancesState;

export default mongoose.model('Project', projectSchema);
