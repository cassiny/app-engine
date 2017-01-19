import injections from '../../common/injections';
import UserService from '../../common/user/service/UserService';

export default class ProjectService {
  static _project = null;

  static getCurrentProject() {
    if (!ProjectService._project) {
      const prj = injections.project;
      prj.fullPath = `${UserService.getCurrentUser().username}/${prj.path}`;
      prj.lastestBuild = {
        revision: 5
      };
      prj.applicationInstances = [
        { name: 'app-01', state: 10, host: '172.168.4.152', port: 8054, build: { revision: 12 } },
        { name: 'app-02', state: 0, host: '172.168.4.153', port: 8055, build: { revision: 14 } }
      ];
      prj.serviceInstances = [
        { name: 'mongodb-01', service: { name: 'MongoDB 3.4' }, state: 10 },
        { name: 'mysql-01', service: { name: 'MySQL 8' }, state: 0 }
      ];
      ProjectService._project = prj;
    }
    return ProjectService._project;
  }

  static async getBuildsOfPrjoject(username, path) {  // eslint-disable-line no-unused-vars
    return [
      {
        revision: 5, branch: 'master', message: 'Add something.', state: 0, hash: 'a9f38d6', startTime: new Date(), endTime: new Date()
      },
      {
        revision: 4, branch: 'master', message: 'Add something.', state: 200, hash: 'a9f38d6', startTime: new Date(), endTime: new Date()
      },
      {
        revision: 3, branch: 'master', message: 'Add something.', state: 500, hash: 'a9f38d6', startTime: new Date(), endTime: new Date()
      },
      {
        revision: 2, branch: 'master', message: 'Add something.', state: 501, hash: 'a9f38d6', startTime: new Date(), endTime: new Date()
      },
      {
        revision: 1, branch: 'master', message: 'Add something.', state: 500, hash: 'a9f38d6', startTime: new Date(), endTime: new Date()
      },

    ];
  }
}
