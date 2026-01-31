// src/Components/FrontEndSection/nodes-edges.js

// Nodes افتراضية مع id, position و measured (ضرورية للـ XYFlow + Dagre)
export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'HTML' },
    position: { x: 0, y: 0 },
    measured: { width: 150, height: 50 },
    draggable: false, // هنا منع السحب
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'CSS' },
    position: { x: 0, y: 100 },
    measured: { width: 150, height: 50 },
    draggable: false,
  },
  {
    id: '3',
    type: 'default',
    data: { label: 'JavaScript' },
    position: { x: 0, y: 200 },
    measured: { width: 150, height: 50 },
    draggable: false,
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'React' },
    position: { x: 0, y: 300 },
    measured: { width: 150, height: 50 },
    draggable: false,
  },
];

// Edges افتراضية تربط الـ nodes
export const initialEdges = [
  { id: 'BACKe', source: '0', target: '1', type: 'default' , },
  { id: 'e1-2', source: '1', target: '2', type: 'default'  , },
  { id: 'e2-3', source: '2', target: '3', type: 'default'  , },
  { id: 'e3-4', source: '3', target: '4', type: 'default'  , },
  { id: 'react', source: '5', target: '3', type: 'default' , },
  { id: 'veu', source: '4', target: '3', type: 'default'   , },
  { id: 'bootstrap', source: '6', target: '2', type: 'default'},
  { id: 'tailwind', source: '7', target: '2', type: 'default' },
  { id: 'angler', source: '8', target: '3', type: 'default', },
  { id: 'next', source: '9', target: '3', type: 'default', },
];
