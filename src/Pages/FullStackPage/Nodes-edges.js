export const initialNodes = [
  { id: '1', type: 'input', data: { label: 'HTML' }, position: { x: 0, y: 0 }, measured: { width: 150, height: 50 }, draggable: false },
  { id: '2', type: 'default', data: { label: 'CSS' }, position: { x: 0, y: 100 }, measured: { width: 150, height: 50 }, draggable: false },
  { id: '3', type: 'default', data: { label: 'JavaScript' }, position: { x: 0, y: 200 }, measured: { width: 150, height: 50 }, draggable: false },
  { id: '4', type: 'output', data: { label: 'React' }, position: { x: 0, y: 300 }, measured: { width: 150, height: 50 }, draggable: false },
  { id: '5', type: 'output', data: { label: 'Vue' }, position: { x: 200, y: 300 }, measured: { width: 150, height: 50 }, draggable: false },
  { id: '6', type: 'output', data: { label: 'Angler' }, position: { x: -200, y: 300 }, measured: { width: 150, height: 50 }, draggable: false },
];

export const initialEdges = [
  { id: 'html-css', source: '1', target: '2', type: 'default' },
  { id: 'css-js', source: '2', target: '3', type: 'default' },
  { id: 'js-react', source: '3', target: '4', type: 'default' },
  { id: 'js-vue', source: '3', target: '5', type: 'default' },
  { id: 'js-angler', source: '3', target: '6', type: 'default' },
];
