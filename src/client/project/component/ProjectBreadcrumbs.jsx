import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProjectBreadcrumbs extends Component {
  static contextTypes: {
    router: React.PropTypes.func.isRequired,
  };

  static propTypes = {
    username: PropTypes.string.isRequired,
    path: PropTypes.string,
  };

  static defaultProps = {
    path: '',
  };

  render() {
    const { username, path } = this.props;
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={`/project/${username}/`}>{username}</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/project/${username}/${path}/`}>{path}</Link>
        </li>
      </ol>
    );
  }
}
