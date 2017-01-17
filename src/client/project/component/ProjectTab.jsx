import React, { Component, PropTypes } from 'react';

export default class ProjectTab extends Component {
  static propTypes = {
    page: PropTypes.element
  };

  static defaultProps = {
    page: null
  };

  render() {
    return (<nav>
      {this.props.page}
    </nav>);
  }
}
