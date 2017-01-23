import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class DropdownButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string),
    handleClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    title: '',
    menu: [],
    handleClick: () => {},
  };

  state = {
    open: false
  };

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
    this.setState({
      open: false
    });
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

  render() {
    return (
      <div className={classnames(this.props.className, 'dropdown-button', { open: this.state.open })}>
        <a
          className="btn btn-link dropdown-toggle"
          onClick={this.handleClick}
        >
          {this.props.title}
          <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          {this.props.menu.map(this.renderMenuItem)}
        </ul>
      </div>
    );
  }
}
