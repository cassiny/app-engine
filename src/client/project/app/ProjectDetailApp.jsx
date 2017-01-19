import React, { Component, PropTypes } from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { render } from 'react-dom';

import ProjectService from '../service/ProjectService';
import ProjectTab from '../component/ProjectTab';
import ProjectBreadcrumb from '../component/ProjectBreadcrumb';

import BuildHistoryTabPage from '../tab/BuildHistoryTabPage';
import DashboardTabPage from '../tab/DashboardTabPage';
import NotFoundPage from '../../common/page/NotFoundPage';
import SettingsTabPage from '../tab/SettingsTabPage';

export default class ProjectDetailApp extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.shape({ username: PropTypes.string, path: PropTypes.string }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      project: {
        applicationInstances: [],
        serviceInstances: []
      },
      buildHistory: null
    };
  }

  /**
   * setState is not allowed in componentDidMount.
   * Because it will trigger a second render() call and can lead to layout thrashing.
   */
  async componentWillMount() {
    const project = ProjectService.getCurrentProject();
    const buildHistory = await ProjectService.getBuildsOfPrjoject(this.props.params.username, this.props.params.path)
    this.setState({
      project,
      buildHistory
    });
  }

  render() {
    const { username, path } = this.props.params;
    const projectPath = `${username}/${path}`;
    document.title = `${path} - Cassiny AppEngine`;
    const tabs = [
      { name: 'Dashboard', isIndex: true },
      { name: 'Build History', path: 'builds' },
      { name: 'Settings', path: 'settings' }
    ].map((tab) => {
      const absPath = `/project/${projectPath}/${tab.isIndex ? '' : tab.path}`;
      return Object.assign({}, tab, {
        path: absPath,
        isActive: this.context.router.isActive(absPath, tab.isIndex)
      });
    });
    return (
      <div className="project-detail-app">
        <div className="project-header">
          <div className="container">
            <ProjectBreadcrumb username={username} path={path} />
          </div>
        </div>
        <div className="project-content">
          <ProjectTab
            project={this.state.project}
            buildHistory={this.state.buildHistory}
            tabs={tabs}
            page={this.props.children}
          />
        </div>
      </div>
    );
  }
}


$(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/project/:username/:path" component={ProjectDetailApp}>
        <IndexRoute component={DashboardTabPage} />
        <Route path="builds" component={BuildHistoryTabPage} />
        <Route path="settings" component={SettingsTabPage} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>, document.getElementById('projectDetailAppRoot'));
});
