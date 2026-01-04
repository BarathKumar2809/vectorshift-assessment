import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './styles/globals.css';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div style={{ width: '250px', flexShrink: 0 }}>
        <PipelineToolbar />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
