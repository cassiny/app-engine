import Joi from 'joi';

import CassinyError from './../error/CassinyError';
import Project from './model/Project';


export default class ProjectManager {

  static async createProject(
    // project
    { userId, name, desc, path },
    // git
    { url, username, password, branch },
    ) {
    const existProject = await this.existProject(userId, path);

    // Iteral validation
    const validateError =
      Joi.validate({ name, desc, path }, Project.projectInfoSchema).error ||
      Joi.validate({ url }, Project.gitInfoSchema).error;

    if (validateError !== null) {
      throw CassinyError.PROJECT_CREATE_PARAM_INVALID((validateError.message));
    }

    // should not have duplicate of path and username
    if (existProject) {
      throw CassinyError.PROJECT_PATH_ALREADY_EXIST(`Project ${path} already exists`);
    }

    const project = new Project({
      ownerId: userId,
      name,
      desc,
      path,
      git: {
        repository: { url, username, password },
        branch,
      },
    });

    await project.save();
    return project;
  }

  static async getProjectByPath(userId, path) {
    const project = await Project.getProjectByPath(userId, path);
    return project;
  }

  static async getProjectsByUserId(userId) {
    return Project.getProjectsByUserId(userId);
  }

  static async existProject(userId, path) {
    return Project.existProject(userId, path);
  }

  static async getBuildHistoryList(userId, path) {
    return [
      {},
      {},
      {}
    ];
  }

}

