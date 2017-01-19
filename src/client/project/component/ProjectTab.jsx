import React, { cloneElement, Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProjectTab extends Component {
  static propTypes = {
    page: PropTypes.element,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      isActive: PropTypes.boolean,
      name: PropTypes.string,
      path: PropTypes.string
    })).isRequired
  };

  static defaultProps = {
    page: null,
  };

  render() {
    const { tabs, ...other } = this.props;

    return (
      <div className="project-tab">
        <nav className="tabs">
          <div className="container">
            <ul className="nav nav-tabs">
              {tabs.map(this.renderTab)}
            </ul>
          </div>
        </nav>
        <main>
          <div className="container">
            {cloneElement(this.props.page, { ...other })}
          </div>
        </main>
      </div>
    );
  }

  renderTab = (tab) => {
    return (
      <li key={tab.path} className={tab.isActive ? 'active' : null} role="presentation">
        <Link to={tab.path}>{tab.name}</Link>
      </li>
    );
  }
}
