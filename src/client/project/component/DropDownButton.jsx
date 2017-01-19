import React, { Component, PropTypes } from 'react';

export default class DropdownButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    menu: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.element)]).isRequired,
    handleClick: PropTypes.func
  };

  static defaultProps = {
    className: '',
    title: '',
    menu: null,
    handleClick: null
  };

  render() {
    const menu = this.props.menu.map(this._createMenuItem);
    return (<div className={`app-engine-dropdown-button dropdown btn-group ${this.props.className}`}>
      <button onClick={this._handleClick.bind(this)}>{this.props.title}</button>
      <ul className="dropdown-menu" onClick={this._handleItemClick.bind(this)}>{menu}</ul>
    </div>);
  }

  _createMenuItem(item, index) {
    return (<li key={`menu-item-${index}`} data-index={index}>{item}</li>);
  }

  _handleClick(e) {
    console.log(e, "");
  }

  _handleItemClick(e) {
    const target = e.currentTarget;
    console.log(e);
  }


}
