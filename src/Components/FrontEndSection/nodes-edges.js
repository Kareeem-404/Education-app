export const initialNodes = [
  {
    id: '1',
    data: { label: 'HTML' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'CSS' },
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    data: { label: 'JavaScript' },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
  },
];
