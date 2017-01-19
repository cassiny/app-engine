import React, { Component, PropTypes } from 'react';

const stateMap = {
  0: 'Stopped',
  10: 'Stopping'
};

export default class InstanceList extends Component {
  static propTypes = {
    instances: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      state: PropTypes.number,
      host: PropTypes.string,
      port: PropTypes.number,
      build: PropTypes.shape({
        revision: PropTypes.number
      })
    })).isRequired
  };

  render() {
    const { instances } = this.props;
    return (
      <div className="instance-list">
        {instances.map(this.renderInstance)}
      </div>
    );
  }

  renderInstance = (instance) => {
    const className = `instance-list-item col-md-9 offset-md-1 ${stateMap[instance.state]}`;
    return (
      <div className={className} key={instance.name}>
        <span className="instance-name col-md-3">{instance.name}</span>
        <span className="instance-adress col-md-3">{`${instance.host}:${instance.port}`}</span>
        <span className="instance-state col-md-2">{stateMap[instance.state]}</span>
        <span className="instance-build col-md-2">{`build#${instance.build.revision}`}</span>
        <button type="button" className="btn btn-default col-md-1">Default</button>
      </div>
    );
  }
}
