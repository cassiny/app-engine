import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProjectTab extends Component {
  static propTypes = {
    page: PropTypes.element,
    projectPath: PropTypes.string.isRequired
  };

  static defaultProps = {
    page: null,
  };

  render() {
    const tabs = this.props.tabs.map(tab =>
      (<li key={tab.path} className={tab.isActive ? 'active' : null} role="presentation">
        <Link to={tab.path}>{tab.name}</Link>
      </li>));

    return (
      <div className="project-tab">
        <nav className="tabs">
          <ul className="nav nav-tabs">
            {tabs}
          </ul>
        </nav>
        <section className="page">
          {this.props.page}
        </section>
      </div>
    );
  }
}
