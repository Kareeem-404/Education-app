import Dagre from 'dagre';
import React, { useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';

import { initialNodes, initialEdges } from './nodes-edges.js'; 
import '@xyflow/react/dist/style.css';

/**
 * getLayoutedElements - Calculates optimal positions for nodes using Dagre algorithm.
 */
const getLayoutedElements = (nodes, edges, direction) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  // Add edges
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  // Add nodes with width/height fallback
  nodes.forEach((node) =>
    g.setNode(node.id, {
      width: node.measured?.width ?? 100,   // افتراضي 100px
      height: node.measured?.height ?? 50,  // افتراضي 50px
    })
  );

  // Apply Dagre layout
  Dagre.layout(g);

  // Return nodes with calculated positions + fallback
  const safeNodes = nodes.map((node) => {
    const position = g.node(node.id);
    return {
      ...node,
      position: position
        ? {
            x: position.x - (node.measured?.width ?? 100) / 2,
            y: position.y - (node.measured?.height ?? 50) / 2,
          }
        : { x: 0, y: 0 }, // fallback position
    };
  });

  return { nodes: safeNodes, edges };
};

/**
 * LayoutFlow component
 */
export const LayoutFlow = () => {
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      requestAnimationFrame(() => fitView());
    },
    [nodes, edges, setNodes, setEdges, fitView]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      panOnScroll={false}
      /* اختياري: تثبيت مستوى الزوم */
      minZoom={1}
      maxZoom={1}
      panOnDrag={false} className='flex  text-text text-3xl '
    >
      <div className='flex left-140'>
        <span className='ml-135 pt-10'>
          Front-End Road Map  
        </span>
      </div>
    </ReactFlow>
  );
};

/**
 * FrontEndSection wrapper
 */
export default function FrontEndSection() {
  return (
    <ReactFlowProvider  
    >
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
