import Project from './model/Project';

export default class ProjectManager {


  static async createProject(
    // project
    { userId, name, desc, path },
    // git
    { url, username, password, branch },
    ) {
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
    const project = await Project.findOne({ path, ownerId: userId }).exec();
    return project;
  }

  static async getProjectsByUserId(userId) {
    return Project.getProjectsByUserId(userId);
  }

  static async existProject(userId, path) {
    return Project.existProject(userId, path);
  }

}

