// textNode.js
// Enhanced Text node with dynamic resizing and variable detection - FIXED OVERFLOW

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { nodeConfigs } from '../config/nodeConfig';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text ?? '{{input}}');

  // Extract variables from text using regex
  const variables = useMemo(() => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }

    return matches;
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Calculate dynamic dimensions based on content
  const getDimensions = () => {
    const lines = currText.split('\n').length;
    const maxLineLength = Math.max(...currText.split('\n').map(line => line.length), 10);

    const width = Math.min(Math.max(200, maxLineLength * 8 + 40), 600);
    const height = Math.min(Math.max(200, lines * 24 + 100), 400);

    return { width, height };
  };

  const dimensions = getDimensions();
  const config = nodeConfigs.text;

  return (
    <div
      className="base-node"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: `2px solid ${config.color}`,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(245, 158, 11, 0.1), 0 0 20px ${config.color}33`,
        padding: '12px',
        transition: 'all 0.3s ease',
        // overflow: 'hidden', // REMOVED to allow handles to show
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${((idx + 1) * 100) / (variables.length + 1)}%`,
            background: config.color,
            width: '12px',
            height: '12px',
            border: '2px solid #1E293B',
          }}
        />
      ))}

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        paddingBottom: '8px',
        borderBottom: `1px solid ${config.color}33`,
        flexShrink: 0,
        width: '100%',
        overflow: 'hidden'
      }}>
        {config.icon && <span style={{ fontSize: '18px', flexShrink: 0 }}>{config.icon}</span>}
        <span style={{
          color: '#F1F5F9',
          fontWeight: '600',
          fontSize: '14px',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {config.title}
        </span>
      </div>

      {/* Description */}
      <div style={{
        color: '#94A3B8',
        fontSize: '11px',
        marginBottom: '8px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%'
      }}>
        {config.description}
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        minHeight: 0,
        width: '100%',
        overflow: 'hidden'
      }}>
        <label style={{
          color: '#CBD5E1',
          fontSize: '11px',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Text
        </label>

        <textarea
          className="nodrag"
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '6px',
            padding: '6px 8px',
            color: '#F1F5F9',
            fontSize: '12px',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            minHeight: '60px',
            flex: 1,
            transition: 'all 0.2s',
            width: '100%',
            boxSizing: 'border-box',
            minWidth: 0,
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
          onFocus={(e) => e.target.style.borderColor = config.color}
          onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
        />
      </div>

      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: config.color,
          width: '12px',
          height: '12px',
          border: '2px solid #1E293B',
        }}
      />
    </div>
  );
};
