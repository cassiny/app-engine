import render from './../templates/mustacheRender';
import Build from './model/Build';

const DockFileTemplateFileName = 'DockerFile.tpl';

export default class BuildManager {

  // TODO:
  // to build image base on project meta infomation
  static async buildImage(project) {
  }



  static async prepareDockerFile(project, userInfo) {
    return render(DockFileTemplateFileName, {
      username: userInfo.username,
      email: userInfo.email,
      repository: {
        url: project.git.repository.url,
      }
    });
  }

  static async getBuildRecordsByProjectId(projectId) {
    return Build.getBuildsByProjectId(projectId);
  }

  static async getBuildRecordsByPath(userId, projectPath) {
    return Build.getBuildRecordsByPath(userId, projectPath);
  }

}

