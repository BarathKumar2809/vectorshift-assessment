# VectorShift Pipeline Builder

A modern, high-performance visual pipeline builder built with React Flow and FastAPI. This tool allows users to design, configure, and validate complex workflows with an intuitive drag-and-drop interface.

![Pipeline Builder Interface](./frontend/public/favicon.ico) *Note: Add a real screenshot here*

## ✨ Key Features

### 🎨 Modern & Responsive UI
- **Glassmorphism Design**: Sleek dark mode interface with translucent elements and smooth gradients.
- **Interactive Experience**: comprehensive hover effects, animations, and intuitive drag interactions.
- **Modular Toolbar**: Easy access to all available node types.

### 🧩 Intelligent Node System
- **9 Specialized Node Types**: Includes Inputs/Outputs, LLMs, text processors, databases, APIs, and more.
- **Smart Text Node**:
  - **Dynamic Resizing**: Text areas automatically expand to fit content.
  - **Variable Detection**: Type `{{variableName}}` to instantly generate an input handle for that variable.
- **Robust Architecture**: Built on a reusable `BaseNode` abstraction for consistency and maintainability.

### ⚙️ Powerful Backend Validation
- **DAG Detection**: Real-time graph analysis to ensure pipelines are Directed Acyclic Graphs (no infinite loops).
- **Pipeline Parsing**: accurately calculates node and edge metrics.
- **FastAPI Integration**: High-performance backend handling graph algorithms and validation logic.

## 🛠️ Tech Stack

**Frontend**
- **React 18**: Core UI library.
- **React Flow**: Canvas and graph rendering engine.
- **Zustand**: Lightweight global state management.
- **CSS3**: Custom variables, flexbox/grid for layout (No bulky UI frameworks).

**Backend**
- **Python 3.8+**: Core language.
- **FastAPI**: Modern web framework for building APIs.
- **NetworkX** (Algorithm logic implemented manually for optimization).

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vectorshift-pipeline-builder.git
   cd vectorshift-pipeline-builder
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   *The application will launch at `http://localhost:3000`*

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   *The server will start at `http://localhost:8000`*

## 📖 Usage Guide

1.  **Add Nodes**: Drag nodes from the sidebar onto the canvas.
2.  **Connect**: Click and drag from a handle (dot) on one node to another to create an edge.
3.  **Configure**:
    *   **Text Node**: Type `{{myVar}}` to create a dynamic input slot.
    *   **LLM Node**: Configure Model, Temperature, and Max Tokens.
    *   **API Node**: Set URL, Method, and Headers.
4.  **Validate**: Click **"Submit Pipeline"** to run the backend validation engine. It will check for cycles and report validity.

## 📂 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components (BaseNode)
│   │   ├── nodes/         # Individual node implementations
│   │   ├── config/        # Centralized node configuration
│   │   └── styles/        # Global design system
└── backend/
    ├── main.py            # API endpoints and graph algorithms
```

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
