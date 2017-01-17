import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProjectBreadcrumb extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    path: PropTypes.string
  };

  static defaultProps = {
    path: null
  };

  render() {
    const { username, path } = this.props;
    return (
      <ol className="project-crumb breadcrumb">
        <li className="breadcrumb-item">
          <Link to={`/project/${username}/`}>{username}</Link>
        </li>
        <li className="breadcrumb-item active">
          <Link to={`/project/${username}/${path}/`}>{path}</Link>
        </li>
      </ol>
    );
  }
}
