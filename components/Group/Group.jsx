var React = require('react');

require('./Group.less');
require('./Group-noflex.css');
var cx = require('../cx')('RTGroup');

var Group = React.createClass({
  render() {
    var style = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    var first = null;
    var last = null;
    React.Children.forEach(this.props.children, child => {
      if (child) {
        first = first || child;
        last = child;
      }
    });

    return (
      <div className={cx('')} style={style}>
        {React.Children.map(this.props.children, child => {
          if (!child) {
            return null;
          }

          var wrapCss = cx({
            wrap: true,
            fixed: !child.props.mainInGroup,
            stretch: child.props.mainInGroup,
          });
          var itemCss = cx({
            item: true,
            'item-first': child === first,
          });
          if (child !== first) {
            itemCss += ' RTSpec-hNotFirst';
          }
          if (child !== last) {
            itemCss += ' RTSpec-hNotLast';
          }

          if (child.props.mainInGroup) {
            child = React.cloneElement(child, {width: '100%'});
          }

          return (
            <div className={wrapCss}>
              <div className={itemCss}>{child}</div>
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = Group;
