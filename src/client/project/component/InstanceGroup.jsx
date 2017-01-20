import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    extra: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  };

  static defaultProps = {
    title: '',
    extra: null,
    children: null,
    style: {}
  };

  render() {
    const { className, extra, children, title } = this.props;
    return (
      <div
        className={classnames(this.props.className, 'instance-group', 'panel', 'panel-default')}
      >
        <div className="instance-group-header panel-heading">
          <div className="title panel-title">
            {this.props.title}
          </div>
          <div className="extra panel-title">{this.props.extra}</div>
        </div>
        <div className="instance-group-body panel-body">{this.props.children}</div>
      </div>);
  }
}
