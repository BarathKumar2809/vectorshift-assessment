// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px',
            background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
            borderRight: '1px solid rgba(99, 102, 241, 0.2)',
            minHeight: '100vh'
        }}>
            <h3 style={{
                color: '#F1F5F9',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '0.5px'
            }}>
                Node Library
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DraggableNode type='customInput' label='📥 Input' />
                <DraggableNode type='llm' label='🤖 LLM' />
                <DraggableNode type='customOutput' label='📤 Output' />
                <DraggableNode type='text' label='📝 Text' />
                <DraggableNode type='transform' label='🔄 Transform' />
                <DraggableNode type='filter' label='🔍 Filter' />
                <DraggableNode type='api' label='🌐 API' />
                <DraggableNode type='database' label='💾 Database' />
                <DraggableNode type='notification' label='🔔 Notification' />
            </div>
        </div>
    );
};
