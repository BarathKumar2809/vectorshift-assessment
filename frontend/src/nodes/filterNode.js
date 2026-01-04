// filterNode.js

import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfig';

export const FilterNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={nodeConfigs.filter} />;
};
