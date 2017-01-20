import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

import DropDownButton from '../component/DropDownButton';

const stateMap = {
  0: 'Stopped',
  10: 'Stopping'
};

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    instances: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      state: PropTypes.number,
      host: PropTypes.string,
      port: PropTypes.number,
      build: PropTypes.shape({
        revision: PropTypes.number
      })
    })).isRequired,
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={classnames('instance-group', 'panel', 'panel-default')}>
        <div className="instance-group-header panel-heading">
          <div className="title panel-title">
            <span className="h4">Application</span>
            <span className="instances-account">{`${this.props.instances.length} instances`}</span>
          </div>
          <div className="extra panel-title">
            <DropDownButton className="pull-right" title="Operations" menu={['Stop all', 'Start all', 'Restart all']} />
          </div>
        </div>
        <div className="instance-group-body panel-body">
          <div className="instance-list">
            {this.props.instances.map(this.renderInstance)}
          </div>
        </div>
      </div>
    );
  }

  renderInstance = (instance) => {
    const className = `instance-list-item col-md-9 offset-md-1 ${stateMap[instance.state]}`;
    return (
      <div className={className} key={instance.name}>
        <div className="info-group col-md-5">
          <a className="name">{instance.name}</a>
          <a className="address">{`${instance.host}:${instance.port}`}</a>
        </div>
        <span className="state col-md-4">{stateMap[instance.state]}</span>
        <span className="build col-md-3">{`build#${instance.build.revision}`}</span>
        <button type="button" className="btn btn-default col-md-1">Start</button>
      </div>
    );
  }
}
