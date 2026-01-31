import { useEffect, useState } from "react";

const STORAGE_KEY = "user-roadmap";

export function useRoadmapStore() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);
    setNodes(data.nodes || []);
    setEdges(data.edges || []);
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ nodes, edges })
    );
  }, [nodes, edges]);

  const addNode = (label) => {
    const newNode = {
      id: crypto.randomUUID(),
      position: {
        x: window.innerWidth / 2 + Math.random() * 200 - 100,
        y: window.innerHeight / 2 + Math.random() * 200 - 100,
      },
      data: { label },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
  };
}
