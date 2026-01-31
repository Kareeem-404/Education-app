import React, { useRef, useState, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
} from '@xyflow/react';
import useGemini from '../Hooks/useGemini';
import { useRoadmapStore } from './useRoadmap';
//=================== Material UI Imports =========
// Import Drawer component for side panel
import Drawer from "@mui/material/Drawer";
// Import Close icon for closing the drawer
import CloseIcon from "@mui/icons-material/Close";

export default function Roadmap() {
    const { nodes, edges, addNode, onNodesChange, onEdgesChange } = useRoadmapStore();
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
      const [currentNode, setCurrentNode] = useState(null); // Stores the current node


    const { sendMSG , response } = useGemini();
    const styledNodes = nodes.map((node) => ({
    ...node,
    style: {
      background: '#25343F',
      color: '#fff',
      borderRadius: '8px',
      border: 'none',
      padding: '10px',
      fontWeight: 'bold',
      fontSize: '16px'
    },
}));

    // Drawer width constant for the side panel
  const drawerWidth = 440;
  // Tailwind CSS classes for AI response container styling
  const AiResponseDiv =
    "flex flex-row items-center gap-41 w-full  text-text justify-between";
  // Tailwind CSS classes for AI response title styling
  const TextAiResponse = "text-3xl text-text font-bold";
    console.log("🎨 render Roadmap");
    console.log("📍 nodes from store:", nodes);
    console.log("📍 edges from store:", edges);
    console.log(
        "📦 localStorage:",
        localStorage.getItem("user-roadmap")
    );

    const handleAddNode = () => {
        const label = inputRef.current.value;
        if (label.trim() === '') return;

        addNode(label);
        inputRef.current.value = '';

        console.log("✅ Add Node clicked:", label);
    };

    return (
        <div style={{ height: '100vh' }}>
            <div style={{ padding: 10, marginTop: 70 }}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="enter new node..."
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-main mr-2"
                />
                <button onClick={handleAddNode} className="bg-text duration-500 transition  text-white px-4 py-2 rounded-md hover:duration-500  hover:bg-gray-700 cursor-pointer">Add Node</button>
            </div>

            <ReactFlow
                nodes={styledNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                onClick={(e) => {
                    const node = e.target.closest("[data-id]");
                    if (node) {
                        console.log("🖱 clicked node:", node.innerText);
                        sendMSG(node.innerText);
                    }
                    setOpen(true);
                }}
            >
                <Controls  />
            </ReactFlow>
            <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": { width: drawerWidth },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >{/* Drawer header and content area */}
        <div className="p-4">
          {/* Header with title and close button */}
          <div className={AiResponseDiv}>
            <h2 className={TextAiResponse}>AI Response</h2>
            {/* Close button to hide the drawer */}
            <CloseIcon
              className="cursor-pointer  "
              onClick={() => setOpen(false)}
            />
          </div>
          {/* Display AI response or loading message */}
          <p>{response || "Waiting for AI..."}</p>
        </div>
        </Drawer>
        </div>
    );
}
