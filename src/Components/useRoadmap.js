import { useEffect, useState, useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

const STORAGE_KEY = "user-roadmap";

export function useRoadmapStore() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // 🔹 load once
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const data = JSON.parse(saved);
            if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
                setNodes(data.nodes);
                setEdges(data.edges);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    // 🔹 save on change
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ nodes, edges })
        );
    }, [nodes, edges]);

    // ✅ MUST be here
    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);

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
        addNode,
        onNodesChange,
        onEdgesChange,
    };
}
