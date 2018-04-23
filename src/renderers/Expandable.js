import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, updateNode } from '../selectors/nodes';
import { Renderer } from '../shapes/rendererShapes';

const Expandable = ({
  onChange,
  node,
  children,
  iconsClassNameMap = {
    expanded: 'mi mi-keyboard-arrow-down',
    collapsed: 'mi mi-keyboard-arrow-right',
    lastChild: ''
  }
  }) => {
  const { hasChildren, isExpanded, isFolder } = getNodeRenderOptions(node);
  const className = classNames({
    [iconsClassNameMap.expanded]: isFolder && isExpanded,
    [iconsClassNameMap.collapsed]: isFolder && !isExpanded,
    [iconsClassNameMap.lastChild]: !isFolder
  });

    const handleChange = (e) => {
      if (!isFolder) {
        return;
      }
      e.stopPropagation();
      onChange(updateNode(node, { expanded: !isExpanded }));
    };

  return (
    <span>
      <i
        tabIndex={0}
        id={node.id}
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}>
      </i>
      { children }
    </span>);
};

Expandable.propTypes = {
  ...Renderer,
  iconsClassNameMap: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
    lastChild: PropTypes.string
  })
}

export default Expandable;
