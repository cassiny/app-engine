import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class DropdownButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    menu: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.element)]).isRequired,
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
    const menu = this.props.menu.map(this._createMenuItem);
    return (<div className={`${this._getStyleClass()} ${this.state.open ? 'open' : ''} `}>
      <button className="btn btn-link" onClick={this._handleClick}>{this.props.title}</button>
      <ul className="dropdown-menu">{menu}</ul>
    </div>);
  }

  _createMenuItem = (item, index) => {
    return (
      <li
        key={`menu-item-${index}`}
        data-index={index}
        className="menu-item list-group-item"
        onClick={this._handleItemClick}
      >
        {item}
      </li>
    );
  }

  _getStyleClass = () => {
    return classnames(this.props.className, {
      'app-engine-dropdown-button': true,
      dropdown: true,
      'pull-right': this.props.float === 'right'
    });
  }

  _handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  _handleItemClick = (e) => {
    const index = e.currentTarget.dataset.index;
    if (this.props.handleClick) {
      this.props.handleClick(index);
    }
    this._handleClick();
  }
}
