import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  };

  static defaultProps = {
    className: '',
    title: '',
    extra: null,
    children: null,
    style: {}
  };

  render() {
    return (
      <div
        className={`app-engine-card panel panel-default ${this.props.className}`}
      >
        <div className="card-header panel-heading">
          <div className="card-title panel-title">
            {this.props.title}
          </div>
          <div className="card-extra panel-title">{this.props.extra}</div>
        </div>
        <div className="card-body panel-body">{this.props.children}</div>
      </div>);
  }
}
