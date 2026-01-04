// notificationNode.js

import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../config/nodeConfig';

export const NotificationNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={nodeConfigs.notification} />;
};
