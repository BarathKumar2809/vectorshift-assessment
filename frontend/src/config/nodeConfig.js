// nodeConfig.js
// Configuration for all node types

export const nodeConfigs = {
    customInput: {
        title: 'Input',
        icon: '📥',
        color: '#3B82F6',
        width: 220,
        height: 200,
        description: 'Input data source',
        fields: [
            {
                name: 'inputName',
                label: 'Name',
                type: 'text',
                defaultValue: 'input',
                placeholder: 'Enter input name'
            },
            {
                name: 'inputType',
                label: 'Type',
                type: 'select',
                options: ['Text', 'File'],
                defaultValue: 'Text'
            }
        ],
        handles: [
            { id: 'value', type: 'source' }
        ]
    },

    customOutput: {
        title: 'Output',
        icon: '📤',
        color: '#10B981',
        width: 220,
        height: 200,
        description: 'Output destination',
        fields: [
            {
                name: 'outputName',
                label: 'Name',
                type: 'text',
                defaultValue: 'output',
                placeholder: 'Enter output name'
            },
            {
                name: 'outputType',
                label: 'Type',
                type: 'select',
                options: ['Text', 'Image'],
                defaultValue: 'Text'
            }
        ],
        handles: [
            { id: 'value', type: 'target' }
        ]
    },

    llm: {
        title: 'LLM',
        icon: '🤖',
        color: '#8B5CF6',
        width: 220,
        height: 300,
        description: 'Large Language Model',
        fields: [
            {
                name: 'model',
                label: 'Model',
                type: 'select',
                options: ['GPT-4', 'GPT-3.5', 'Claude-3', 'Llama-3'],
                defaultValue: 'GPT-4'
            },
            {
                name: 'maxTokens',
                label: 'Max Tokens',
                type: 'number',
                defaultValue: 2000,
                min: 1,
                max: 32000
            },
            {
                name: 'temperature',
                label: 'Temperature',
                type: 'text',
                defaultValue: '0.7',
                placeholder: '0.0 - 1.0'
            }
        ],
        handles: [
            { id: 'system', type: 'target', position: '33%' },
            { id: 'prompt', type: 'target', position: '66%' },
            { id: 'response', type: 'source' }
        ]
    },

    text: {
        title: 'Text',
        icon: '📝',
        color: '#F59E0B',
        minWidth: 200,
        maxWidth: 600,
        minHeight: 100,
        maxHeight: 400,
        dynamicSize: {
            field: 'text'
        },
        description: 'Text template with variables',
        fields: [
            {
                name: 'text',
                label: 'Text',
                type: 'textarea',
                defaultValue: '{{input}}',
                placeholder: 'Enter text with {{variables}}',
                rows: 3
            }
        ],
        handles: [
            { id: 'output', type: 'source' }
        ]
    },

    // NEW NODE 1: Transform
    transform: {
        title: 'Transform',
        icon: '🔄',
        color: '#EC4899',
        width: 240,
        height: 140,
        description: 'Transform data',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                options: ['Uppercase', 'Lowercase', 'Trim', 'Reverse', 'Replace'],
                defaultValue: 'Uppercase'
            },
            {
                name: 'parameter',
                label: 'Parameter',
                type: 'text',
                defaultValue: '',
                placeholder: 'Optional parameter'
            }
        ],
        handles: [
            { id: 'input', type: 'target' },
            { id: 'output', type: 'source' }
        ]
    },

    // NEW NODE 2: Filter
    filter: {
        title: 'Filter',
        icon: '🔍',
        color: '#14B8A6',
        width: 240,
        height: 140,
        description: 'Filter data conditionally',
        fields: [
            {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                options: ['Contains', 'Equals', 'Greater Than', 'Less Than', 'Not Empty'],
                defaultValue: 'Contains'
            },
            {
                name: 'value',
                label: 'Value',
                type: 'text',
                defaultValue: '',
                placeholder: 'Comparison value'
            }
        ],
        handles: [
            { id: 'input', type: 'target' },
            { id: 'passed', type: 'source', position: '40%' },
            { id: 'failed', type: 'source', position: '60%' }
        ]
    },

    // NEW NODE 3: API
    api: {
        title: 'API',
        icon: '🌐',
        color: '#06B6D4',
        width: 260,
        height: 160,
        description: 'HTTP API request',
        fields: [
            {
                name: 'method',
                label: 'Method',
                type: 'select',
                options: ['GET', 'POST', 'PUT', 'DELETE'],
                defaultValue: 'GET'
            },
            {
                name: 'url',
                label: 'URL',
                type: 'text',
                defaultValue: 'https://api.example.com',
                placeholder: 'Enter API endpoint'
            },
            {
                name: 'headers',
                label: 'Headers',
                type: 'text',
                defaultValue: '',
                placeholder: 'JSON headers (optional)'
            }
        ],
        handles: [
            { id: 'body', type: 'target' },
            { id: 'response', type: 'source' }
        ]
    },

    // NEW NODE 4: Database
    database: {
        title: 'Database',
        icon: '💾',
        color: '#EF4444',
        width: 260,
        height: 160,
        description: 'Database query',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
                defaultValue: 'SELECT'
            },
            {
                name: 'table',
                label: 'Table',
                type: 'text',
                defaultValue: 'users',
                placeholder: 'Table name'
            },
            {
                name: 'query',
                label: 'Query',
                type: 'textarea',
                defaultValue: '',
                placeholder: 'SQL query or conditions',
                rows: 2
            }
        ],
        handles: [
            { id: 'params', type: 'target' },
            { id: 'result', type: 'source' }
        ]
    },

    // NEW NODE 5: Notification
    notification: {
        title: 'Notification',
        icon: '🔔',
        color: '#F97316',
        width: 240,
        height: 140,
        description: 'Send notification',
        fields: [
            {
                name: 'channel',
                label: 'Channel',
                type: 'select',
                options: ['Email', 'Slack', 'Webhook', 'SMS'],
                defaultValue: 'Email'
            },
            {
                name: 'recipient',
                label: 'Recipient',
                type: 'text',
                defaultValue: '',
                placeholder: 'Email/Channel ID'
            },
            {
                name: 'message',
                label: 'Message',
                type: 'textarea',
                defaultValue: '',
                placeholder: 'Notification message',
                rows: 2
            }
        ],
        handles: [
            { id: 'trigger', type: 'target' },
            { id: 'status', type: 'source' }
        ]
    }
};
