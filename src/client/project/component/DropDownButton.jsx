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

  state = {
    open: false
  }

  render() {
    const menu = this.props.menu.map(this._createMenuItem);
    return (<div className={`app-engine-dropdown-button dropdown btn-group ${this.props.className} ${this.state.open ? 'open' : ''}`}>
      <button className="btn btn-info" onClick={this._handleClick.bind(this)}>{this.props.title}</button>
      <ul className="dropdown-menu" onClick={this._handleItemClick.bind(this)}>{menu}</ul>
    </div>);
  }

  _createMenuItem(item, index) {
    return (<li key={`menu-item-${index}`} data-index={index} className="menuitem">{item}</li>);
  }

  _handleClick(e) {
    console.log(e.currentTarget, '');
    this.setState({
      open: !this.state.open
    });
  }

  _handleItemClick(e) {
    const target = e.currentTarget;
    console.log(e);
  }


}
