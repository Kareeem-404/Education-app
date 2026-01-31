// Import ReactFlow components for creating an interactive flow diagram
import { ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// Import predefined nodes and edges that define the flow structure
import { defaultNodes } from "./node";
import { defaultEdges } from "./edges";
// Import custom hook for integrating Gemini AI responses
import useGemini from "../../Hooks/useGemini";
// Import useState for managing component state
import { useState } from "react";

//=================== Material UI Imports =========
// Import Drawer component for side panel
import Drawer from "@mui/material/Drawer";
// Import Close icon for closing the drawer
import CloseIcon from "@mui/icons-material/Close";

// Main Flow component that displays the Front-End roadmap
function Flow() {
  // Destructure sendMSG function and response from Gemini AI hook
  const { sendMSG, response } = useGemini();
  // State to control the drawer visibility
  const [open, setOpen] = useState(false);
  // State to store the currently clicked node for context
  // eslint-disable-next-line no-unused-vars
  const [currentNode, setCurrentNode] = useState(null); // Stores the current node

  // Handler function triggered when a node is clicked
  // Fetches the node data and sends it to AI for response
  function HandleAskAi(id) {
    // Find the node matching the clicked id from the nodes array
    const node = defaultNodes.find((m) => m.id === id);
    // Send the node's label or prompt to the Gemini AI
    sendMSG(node.data.label || node.data.prompt);
    // Store the current node in state for reference
    setCurrentNode(node);
    // Open the drawer to display AI response
    setOpen(true);
  }

  // Drawer width constant for the side panel
  const drawerWidth = 440;
  // Tailwind CSS classes for AI response container styling
  const AiResponseDiv =
    "flex flex-row items-center gap-41 w-full  text-text justify-between";
  // Tailwind CSS classes for AI response title styling
  const TextAiResponse = "text-3xl text-text font-bold";
  return (
    <>
      {/* Main container with full viewport height and centered layout */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          paddingTop: "64px",
          boxSizing: "border-box",
          background: "#f9f9f9",
        }}
        className=""
      >
        {/* Container for the ReactFlow diagram with fixed dimensions */}
        <div style={{ width: "1200px", height: "800px" }}>
          {/* Page title and description */}
          <h1 className="mt-9 mb-2 text-center text-4xl">Front-End Road Map</h1>
          <p className="mt-9 mb-2 text-center text-lg text-gray-700">
            Go Beyond and Improve Your Skills
          </p>

          {/* ReactFlow component rendering the interactive flow diagram */}
          {/* Nodes and edges are clickable to trigger AI responses */}
          <ReactFlow
            nodes={defaultNodes}
            edges={defaultEdges}
            // fitView
            // When a node is clicked, fetch AI response for that node
            onNodeClick={(e, node) => HandleAskAi(node.id)}
            style={{ width: "100%", height: "100%", background: "#f1f5f9" }}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {/* Side drawer panel that appears when a node is clicked */}
      {/* Displays AI response for the selected node */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {/* Drawer header and content area */}
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
    </>
  );
}

// Export the Flow component as the default export
export default Flow;
