// apiNode.js

import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfig';

export const ApiNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={nodeConfigs.api} />;
};
