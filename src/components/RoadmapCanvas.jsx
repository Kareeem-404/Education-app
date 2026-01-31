import {
    ReactFlow,
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
  } from "@xyflow/react";
  
  import "@xyflow/react/dist/style.css";
  import { useCallback, useEffect } from "react";
  import { useRoadmapStore } from "../Hooks/useRoadmapStore";
  
  export default function RoadmapCanvas() {
    const store = useRoadmapStore();
  
    const [nodes, setNodes, onNodesChange] =
      useNodesState(store.nodes);
  
    const [edges, setEdges, onEdgesChange] =
      useEdgesState(store.edges);
  
    // sync store
    useEffect(() => {
      store.setNodes(nodes);
    }, [nodes]);
  
    useEffect(() => {
      store.setEdges(edges);
    }, [edges]);
  
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      []
    );
  
    return (
      <div className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  }
  