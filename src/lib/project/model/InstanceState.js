class InstanceState {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `InstanceState.${this.name}(${this.code})`;
  }
}


export default {
  STOPPED: new InstanceState('STOPPED', 0),
  STARTING: new InstanceState('STARTING', 1),
  STOPPING: new InstanceState('STOPPING', 10),
  PAUSING: new InstanceState('PAUSING', 20),
  PAUSED: new InstanceState('PAUSED', 21),
  RUNNING: new InstanceState('RUNNING', 200),
  ERROR: new InstanceState('ERROR', 500),
};
