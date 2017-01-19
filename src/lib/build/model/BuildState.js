class BuildState {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `BuildState.${this.name}(${this.code})`;
  }
}


export default {
  BUILDING: new BuildState('BUILDING', 0),
  SUCCESSFULLY: new BuildState('SUCCESSFULLY', 200),
  FAILED: new BuildState('FAILED', 500),
  CANCELD: new BuildState('CANCELD', 501),
};
