import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProjectBreadcrumbs extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  render() {
    const { username, path } = this.props;
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="#">{username}</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="#">{path}</Link>
        </li>
      </ol>
    );
  }
}
