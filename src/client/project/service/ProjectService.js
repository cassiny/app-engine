import UserService from '../../common/user/service/UserService';

export default class ProjectService {
  static _project = null;

  static getCurrentProject() {
    if (ProjectService._project === null) {
      const prj = JSON.parse($('meta[name="cassiny-project"]').attr('value'));
      prj.fullPath = `${UserService.getCurrentUser().username}/${prj.path}`;
      prj.lastestBuild = {

      };
      prj.applicationInstances = [
        { name: 'app-01', state: 10, host: '172.168.4.152', port: 8054, build: { revision: 12 } },
        { name: 'app-02', state: 0, host: '172.168.4.153', port: 8055, build: { revision: 14 } },
      ];
      prj.serviceInstances = [
        { name: 'mongodb-01', service: { name: 'MongoDB 3.4' }, state: 10 },
        { name: 'mysql-01', service: { name: 'MySQL 8' }, state: 0 },
      ];
      ProjectService._project = prj;
    }
    return ProjectService._project;
  }
}
