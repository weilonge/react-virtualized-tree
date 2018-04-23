import React from 'react';
import LargeCollection from './LargeCollection';
import Basic from './Basic';
import Renderers from './Renderers';
import WorldCup from './WorldCup';
import ChangeRenderers from './ChangeRenderers';
import MyChangeRenderers from './MyChangeRenderers';
import Extensions from './Extensions';
import Filterable from './Filterable';
import NodeMeasure from './NodeMeasure';
 
export default {
  ...Basic,
  ...Renderers,
  ...ChangeRenderers,
  ...MyChangeRenderers,
  ...WorldCup,
  ...LargeCollection,
  ...Extensions,
  ...Filterable,
  ...NodeMeasure
}
