// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();

            const dagStatus = data.is_dag ? '✓ Yes' : '✗ No';
            alert(
                `Pipeline Analysis Results:\n\n` +
                `📊 Number of Nodes: ${data.num_nodes}\n` +
                `🔗 Number of Edges: ${data.num_edges}\n` +
                `🔄 Is DAG: ${dagStatus}\n\n` +
                (data.is_dag
                    ? 'Your pipeline is valid and contains no cycles!'
                    : 'Warning: Your pipeline contains cycles.')
            );
        } catch (error) {
            alert(`Error: ${error.message}\n\nPlease make sure the backend server is running on http://localhost:8000`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
            borderTop: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    background: isLoading
                        ? 'linear-gradient(135deg, #475569 0%, #334155 100%)'
                        : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isLoading
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 20px rgba(99, 102, 241, 0.4)',
                    transform: 'translateY(0)',
                    letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.6)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                    }
                }}
            >
                {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
            </button>
        </div>
    );
};
