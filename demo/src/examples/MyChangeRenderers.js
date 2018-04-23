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

const TreeItem = ({ node, children, onClick }) => {
  const indents = () => node.parents.map(
    (item, i) => (<div className="tree-indent" key={i}>|</div>)
  );

  return (
    <div className="layer-node" onClick={onClick}>
      {indents()}
      { children }
    </div>);
};

class MyChangeRenderers extends Component {
  state = {
    nodes: DATA_NODES,
    selected: [],
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  handleClick = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <Tree
        nodes={this.state.nodes}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        nodeMarginLeft={0}
      >
        {
          ({ node, ...rest }) =>
            <TreeItem
              node={node}
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
