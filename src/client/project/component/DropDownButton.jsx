import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class DropdownButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    menu: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    handleClick: PropTypes.func,
    float: PropTypes.string
  };

  static defaultProps = {
    className: '',
    title: '',
    menu: null,
    handleClick: null,
    float: 'left'
  };

  state = {
    open: false
  };

  render() {
    const className = classnames(this.props.className, 'dropdown', 'app-engine-dropdown-button', {
      open: this.state.open,
      'pull-right': this.props.float === 'right'
    })
    return (
      <div className={className}>
        <a
          className="btn btn-link dropdown-toggle"
          role="button"
          onClick={this.handleClick}
          >
          Operations
          <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          {this.props.menu.map(this.renderMenuItem)}
        </ul>
      </div>
    );
  }

  renderMenuItem = (item, index) => {
    return (
      <li
        key={`menu-item-${index}`}
        data-index={index}
        className="menu-item list-group-item"
        onClick={this.handleMenuItemClick}
      >
        {item}
      </li>
    );
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleMenuItemClick = (e) => {
    const index = e.currentTarget.dataset.index;
    if (this.props.handleClick) {
      this.props.handleClick(index);
    }
    this._handleClick();
  }
}
