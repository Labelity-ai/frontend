import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { useWindowDimensions } from '../../utils/hooks';

const inputElement = {
  id: 'input',
  type: 'input',
  data: { label: 'Input' },
  position: { x: 250, y: 100 },
};

const outputElement = {
  id: 'output',
  type: 'output',
  data: { label: 'Output' },
  position: { x: 250, y: 400 },
};

const initialElements = [
  inputElement,
  outputElement,
  { id: '3', data: { label: <div>Node 2</div> }, position: { x: 100, y: 300 } },
  { id: '4', data: { label: <div>Node 2</div> }, position: { x: 300, y: 300 } },
];

const PipelineGraph = ({ labels }) => {
  const { height } = useWindowDimensions();

  const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  return (
    <Box width="100%" height={height - 120} color="white" fill="white">
      <ReactFlow
        minZoom={1}
        maxZoom={1}
        elements={elements}
        onElementsRemove={onElementsRemove}
        paneMoveable={false}
        onConnect={onConnect}
      />
    </Box>
  );
};

export default PipelineGraph;
