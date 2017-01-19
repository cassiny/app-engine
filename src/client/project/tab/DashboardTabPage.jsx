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
        <InstanceList instances={this.props.project.applicationInstances} />
      </div>
    );
  }
}
