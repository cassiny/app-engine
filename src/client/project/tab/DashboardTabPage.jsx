import React, { Component, PropTypes } from 'react';

import Card from '../component/Card';
import DropDownButton from '../component/DropDownButton';
import InstanceList from '../component/InstanceList';

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
        <Card
          title="Application instances"
          extra={<DropDownButton title={<span className="iconfont icon-dropdown" />} menu={['select all', 'delete all', 'detach all']} float="right" />}
        >
          <InstanceList instances={this.props.project.applicationInstances} />
        </Card>
      </div>
    );
  }
}
