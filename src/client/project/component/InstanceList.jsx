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
      <div className="instances">
        {instances.map(this.renderInstance)}
      </div>
    );
  }

  renderInstance = (instance) => {
    const className = `instance ${stateMap[instance.state]}`;
    return (
      <div className={className} key={instance.name}>
        <span className="instance-state">{stateMap[instance.state]}</span>
        <span className="instance-name">{instance.name}</span>
        <span className="instance-adress">{`${instance.host}:${instance.port}`}</span>
        <span className="instance-build">{`build#${instance.build.revision}`}</span>
      </div>
    );
  }
}
