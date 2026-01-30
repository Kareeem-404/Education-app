/**
 * FrontEndSection - Interactive diagram component for visualizing Front-End concepts.
 * Uses ReactFlow library for node-based flow diagrams with Dagre layout algorithm.
 * Features:
 * - Automatic node layout using Dagre algorithm
 * - Layout direction toggle (vertical/horizontal)
 * - Interactive nodes and edges
 */

import Dagre from '@dagrejs/dagre';
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
 * @param {Array} nodes - Array of node objects
 * @param {Array} edges - Array of edge objects
 * @param {String} direction - Layout direction ('TB' for top-to-bottom, 'LR' for left-to-right)
 * @returns {Object} Object with layouted nodes and edges
 */
const getLayoutedElements = (nodes, edges, direction) => {  // Create a new graph for layout calculation
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  // Add edges to graph
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  
  // Add nodes to graph with dimensions
  nodes.forEach((node) =>
    g.setNode(node.id, {
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  // Apply Dagre layout algorithm
  Dagre.layout(g);

  // Return nodes with calculated positions
  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      return {
        ...node,
        position: {
          x: position.x - (node.measured?.width ?? 0) / 2,
          y: position.y - (node.measured?.height ?? 0) / 2,
        },
      };
    }),
    edges,
  };
};

/**
 * LayoutFlow - Main component for the interactive flow diagram.
 * Manages layout state and provides buttons to toggle layout direction.
 */
export const LayoutFlow = () => {
  const { fitView } = useReactFlow();

  // Initialize nodes and edges with state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /**
   * onLayout - Callback to update layout direction and recalculate node positions.
   * @param {String} direction - New layout direction
   */
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      // Fit all nodes in viewport after layout update
      requestAnimationFrame(() => fitView());
    },
    [nodes, edges, setNodes, setEdges, fitView]
  );

  // Render ReactFlow with layout control buttons
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      {/* Control panel for layout direction */}
      <Panel position="top-right">
        {/* Vertical layout button */}
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        {/* Horizontal layout button */}
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

/**
 * FrontEndSection - Wrapper component that provides ReactFlow context.
 */
export default function FrontEndSection() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
