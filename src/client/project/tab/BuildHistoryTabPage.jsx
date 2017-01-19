import React, { PropTypes, Component } from 'react';

import BuildCard from '../component/BuildCard';

export default class BuildHistoryTabPage extends Component {
  static propTypes = {
    buildHistory: PropTypes.arrayOf(PropTypes.shape({
      revision: PropTypes.number
    })).isRequired
  };

  static defaultProps = {
    buildHistory: []
  };

  render() {
    const { buildHistory } = this.props;
    return (<div className="buildHistory">
      {buildHistory.map(this.renderBuild)}
    </div>);
  }

  renderBuild = (build) => {
    return (<BuildCard key={build.revision} build={build} />);
  }
}
