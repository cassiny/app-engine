import React, { Component, PropTypes } from 'react';

import ApplicationInstanceGroup from '../component/ApplicationInstanceGroup';

export default class DashboardTabPage extends Component {
  static propTypes = {
    project: PropTypes.shape({
      applicationInstances: PropTypes.array,
      serviceInstances: PropTypes.array,
    }).isRequired
  };

  render() {
    return (
      <div className="dashboard">
        <ApplicationInstanceGroup instances={this.props.project.applicationInstances} />
      </div>
    );
  }
}
