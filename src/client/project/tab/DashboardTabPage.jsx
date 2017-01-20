import React, { Component, PropTypes } from 'react';

import InstanceGroup from '../component/InstanceGroup';
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
    const title = this.renderInstanceTitle('Application');
    const dropdown = <DropDownButton title={<span className="iconfont icon-dropdown" />} menu={['select all', 'delete all', 'detach all']} float="right" />;
    return (
      <div className="dashboard">
        <InstanceGroup title={title} extra={dropdown}>
          <InstanceList instances={this.props.project.applicationInstances} />
        </InstanceGroup>
      </div>
    );
  }

  renderInstanceTitle = (title) => {
    return (<div className="instances-title">
      <span className="h4">{title}</span>
      <span className="instances-account">{`${this.props.project.applicationInstances.length} instances`}</span>
    </div>);
  }
}
