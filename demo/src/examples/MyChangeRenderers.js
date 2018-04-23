import React, { Component } from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry, constructTree } from '../toolbelt';
import './MyChangeRenderers.css';

const { Deletable, Expandable, Favorite } = Renderers;

const MIN_NUMBER_OF_PARENTS = 500;
const MAX_NUMBER_OF_CHILDREN = 15;
const MAX_DEEPNESS = 4;

const DATA_NODES = true ? Nodes :
  constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN ,MIN_NUMBER_OF_PARENTS);

const TreeItem = ({ node, children, onClick, selected }) => {
  const indents = () => node.parents.map(
    (item, i) => (<div className="tree-indent" key={i}>|</div>)
  );

  let className = "layer-node" +
    (selected ? " selected" : "") +
    (true ? " debug" : "");

  return (
    <div className={className} onClick={e => onClick(e, node)}>
      {indents()}
      { children }
    </div>);
};

class MyChangeRenderers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: DATA_NODES,
      lastSelect: null,
      selected: new Set(),
    };
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  handleClick = (e, node) => {
    const rangeSelect = e.shiftKey;
    const multiSelect = e.metaKey || e.ctrlKey;
    this.setState(prevState => {
      let {selected, lastSelect, ...rest} = prevState;
      if (!multiSelect && !rangeSelect) {
        const had = selected.has(node.id);
        selected.clear();
        if (!had) {
          selected.add(node.id);
          lastSelect = node.id;
        }
      } else {
        selected.add(node.id);
        lastSelect = node.id;
      }
      return {selected, lastSelect, ...rest};
    });
    e.stopPropagation();
  }

  isSelected(id) {
    return this.state.selected.has(id);
  }

  render() {
    return (
      <Tree
        nodes={this.state.nodes}
        onChange={this.handleChange}
        nodeMarginLeft={0}
      >
        {
          ({ node, ...rest }) =>
            <TreeItem
              node={node}
              selected={this.isSelected(node.id)}
              onClick={this.handleClick}
              {...rest}
            >
              <Expandable node={node} {...rest}
                iconsClassNameMap={{
                  expanded: 'mi mi-folder-open',
                  collapsed: 'mi mi-folder',
                  lastChild: 'mi mi-insert-drive-file'
                }}
              >
              </Expandable>
              {node.name}
            </TreeItem>
        }
      </Tree>
    );
  }
}

export default createEntry(
  'my-customize-renderers',
  'MyChangeRenderers',
  'My Customize default renderers',
  (<div>
    <p>My Custom Renderer</p>
    {'{ '}<code>
      expanded: string; collapsed: string; lastChild: string;
    </code>{' }'}
  </div>),
  MyChangeRenderers
);
