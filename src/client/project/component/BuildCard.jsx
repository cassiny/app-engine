import React, { Component, PropTypes } from 'react';

export default class BuildCard extends Component {
  static propTypes = {
    build: PropTypes.object.isRequired
  };

  render() {
    return (<div className="build-card passed">
      <div className="two-line col1">
        <div className="row-item build-num">#5</div>
        <div className="row-item commit-info">
          <div className="branch">master</div>
          <div className="comment">Add README.md.</div>
        </div>
      </div>
      <div className="two-line col2">
        <div className="row-item state">passed</div>
        <div className="row-item hash">asdfasdf</div>
      </div>
      <div className="two-line col3">
        <div className="row-item duration">54s</div>
        <div className="row-item calendar">4min</div>
      </div>
    </div>);
  }
}
