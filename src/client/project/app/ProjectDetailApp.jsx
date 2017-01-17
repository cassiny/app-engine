import React, { Component, PropTypes } from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { render } from 'react-dom';

import NotFoundPage from '../../common/page/NotFoundPage';

import ProjectTab from '../component/ProjectTab';
import ProjectBreadcrumbs from '../component/ProjectBreadcrumbs';

import BuildHistoryTabPage from '../tab/BuildHistoryTabPage';
import DashboardTabPage from '../tab/DashboardTabPage';
import SettingsTabPage from '../tab/SettingsTabPage';

export default class ProjectDetailApp extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { children, params } = this.props;
    return (
      <div>
        <ProjectBreadcrumbs username={params.username} path={params.path} />
        <ProjectTab page={children} />
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
    </Router>, document.getElementById('root'));
});
