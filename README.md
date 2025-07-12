# URDF Maker

This project provides a minimal Node-based web application for building a simple robot link tree. Nodes can be added as children of other nodes and each node can store a mesh file path.

## Running

1. Make sure Node.js is installed.
2. Start the server:

```bash
node server.js
```

3. Open your browser and navigate to `http://localhost:3000`.

The application stores the tree only on the client side. It can be used to quickly sketch a robot link hierarchy.
