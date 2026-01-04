// outputNode.js

import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfig';

export const OutputNode = ({ id, data }) => {
  return <BaseNode id={id} data={data} config={nodeConfigs.customOutput} />;
};
