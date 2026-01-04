// BaseNode.js
// Reusable node abstraction component - FIXED OVERFLOW ISSUES

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, data, config }) => {
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleFieldChange = (fieldName, value) => {
        updateNodeField(id, fieldName, value);
    };

    // Calculate dynamic dimensions if specified
    const getDimensions = () => {
        if (config.dynamicSize && data[config.dynamicSize.field]) {
            const content = data[config.dynamicSize.field];
            const lines = content.split('\n').length;
            const maxLineLength = Math.max(...content.split('\n').map(line => line.length));

            const width = Math.min(Math.max(config.minWidth || 200, maxLineLength * 8 + 40), config.maxWidth || 600);
            const height = Math.min(Math.max(config.minHeight || 100, lines * 24 + 60), config.maxHeight || 400);

            return { width, height };
        }
        return { width: config.width || 200, height: config.height || 80 };
    };

    const dimensions = getDimensions();

    return (
        <div
            className="base-node"
            style={{
                width: dimensions.width,
                height: dimensions.height,
                border: `2px solid ${config.color || '#6366F1'}`,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.1), 0 0 20px ${config.color || '#6366F1'}33`,
                padding: '12px',
                transition: 'all 0.3s ease',
                // overflow: 'hidden', // REMOVED to allow handles to show
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Render input handles */}
            {config.handles?.filter(h => h.type === 'target').map((handle, idx) => (
                <Handle
                    key={handle.id}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: handle.position || `${(idx + 1) * (100 / (config.handles.filter(h => h.type === 'target').length + 1))}%`,
                        background: config.color || '#6366F1',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #1E293B',
                        ...handle.style
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
                borderBottom: `1px solid ${config.color || '#6366F1'}33`,
                flexShrink: 0
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
            {config.description && (
                <div style={{
                    color: '#94A3B8',
                    fontSize: '11px',
                    marginBottom: '8px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {config.description}
                </div>
            )}

            {/* Render fields */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
                minHeight: 0,
                overflow: 'auto'
            }}>
                {config.fields?.map((field) => (
                    <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                        <label style={{
                            color: '#CBD5E1',
                            fontSize: '11px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {field.label}
                        </label>

                        {field.type === 'text' && (
                            <input
                                className="nodrag"
                                type="text"
                                value={data?.[field.name] ?? field.defaultValue ?? ''}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    color: '#F1F5F9',
                                    fontSize: '12px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    minWidth: 0
                                }}
                                onFocus={(e) => e.target.style.borderColor = config.color || '#6366F1'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
                            />
                        )}

                        {field.type === 'textarea' && (
                            <textarea
                                className="nodrag"
                                value={data?.[field.name] ?? field.defaultValue ?? ''}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                placeholder={field.placeholder}
                                rows={field.rows || 3}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    color: '#F1F5F9',
                                    fontSize: '12px',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    minWidth: 0
                                }}
                                onFocus={(e) => e.target.style.borderColor = config.color || '#6366F1'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
                            />
                        )}

                        {field.type === 'select' && (
                            <select
                                className="nodrag"
                                value={data?.[field.name] ?? field.defaultValue ?? field.options[0]}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    color: '#F1F5F9',
                                    fontSize: '12px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    minWidth: 0
                                }}
                                onFocus={(e) => e.target.style.borderColor = config.color || '#6366F1'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
                            >
                                {field.options?.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}

                        {field.type === 'number' && (
                            <input
                                className="nodrag"
                                type="number"
                                value={data?.[field.name] ?? field.defaultValue ?? 0}
                                onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value) || 0)}
                                placeholder={field.placeholder}
                                min={field.min}
                                max={field.max}
                                step={field.step || 1}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    color: '#F1F5F9',
                                    fontSize: '12px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    minWidth: 0
                                }}
                                onFocus={(e) => e.target.style.borderColor = config.color || '#6366F1'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
                            />
                        )}

                        {field.type === 'checkbox' && (
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                color: '#F1F5F9',
                                fontSize: '12px'
                            }}>
                                <input
                                    className="nodrag"
                                    type="checkbox"
                                    checked={data?.[field.name] ?? field.defaultValue ?? false}
                                    onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer',
                                        accentColor: config.color || '#6366F1'
                                    }}
                                />
                                {field.checkboxLabel || field.label}
                            </label>
                        )}

                        {field.type === 'radio' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {field.options.map((option) => (
                                    <label key={option} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: 'pointer',
                                        color: '#F1F5F9',
                                        fontSize: '12px'
                                    }}>
                                        <input
                                            className="nodrag"
                                            type="radio"
                                            name={`${id}-${field.name}`}
                                            value={option}
                                            checked={(data?.[field.name] ?? field.defaultValue) === option}
                                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                cursor: 'pointer',
                                                accentColor: config.color || '#6366F1'
                                            }}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Render output handles */}
            {config.handles?.filter(h => h.type === 'source').map((handle, idx) => (
                <Handle
                    key={handle.id}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${handle.id}`}
                    style={{
                        top: handle.position || `${(idx + 1) * (100 / (config.handles.filter(h => h.type === 'source').length + 1))}%`,
                        background: config.color || '#6366F1',
                        width: '12px',
                        height: '12px',
                        border: '2px solid #1E293B',
                        ...handle.style
                    }}
                />
            ))}
        </div>
    );
};
