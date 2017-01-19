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

  static defaultProps = {
    project: {
      applicationInstances: [],
      serviceInstances: []
    }
  };

  render() {
    return (
      <div className="dashboard">
        <Card title="Dashboard" extra={<DropDownButton title="more" menu={['select all', 'delete all', 'detach all']} />}>
          <InstanceList instances={this.props.project.applicationInstances} />
        </Card>
      </div>
    );
  }
}
