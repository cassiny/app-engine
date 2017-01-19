import React, { Component, PropTypes } from 'react';

import InstanceList from '../component/InstanceList';

export default class DashboardTabPage extends Component {
  static propTypes = {
    project: PropTypes.shape({
      applicationInstances: PropTypes.array,
      serviceInstances: PropTypes.array,
    }).isRequired
  };

  static defaultProps = {
    project: {
      applicationInstances: [],
      serviceInstances: []
    }
  };

  render() {
    return (
      <div className="dashboard">
        <h3>Dashboard</h3>
        <InstanceList instances={this.props.project.applicationInstances} />
      </div>
    );
  }
}
