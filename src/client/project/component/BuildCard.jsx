import React, { Component, PropTypes } from 'react';

export default class BuildCard extends Component {
  static propTypes = {
    build: PropTypes.object.isRequired
  };

  getDescByState(state) {
    const states = {
      '0': 'building',
      '200': 'passed',
      '500': 'failed',
      '501': 'cancelled'
    };
    return states[state];
  }

  render() {
    const { build } = this.props;
    const classString = `build-card ${this.getDescByState(build.state)}`;
    return (
      <div className={classString}>
        <div className="two-line col1">
          <div className="row-item build-num">
            <span className="glyphicon glyphicon-ok" />
            #{build.revision}
          </div>
          <div className="row-item commit-info">
            <div className="branch">{build.branch}</div>
            <div className="comment">{build.message}</div>
          </div>
        </div>
        <div className="two-line col2">
          <div className="row-item state">{this.getDescByState(build.state)}</div>
          <div className="row-item hash">{build.hash}</div>
        </div>
        <div className="two-line col3">
          <div className="row-item duration">{build.startTime.getTime()}</div>
          <div className="row-item calendar">{build.endTime.getTime()}</div>
        </div>
      </div>
    );
  }
}
