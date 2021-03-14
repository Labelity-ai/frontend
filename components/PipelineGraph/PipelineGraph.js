import React, { useMemo, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import ReactFlow, { removeElements, addEdge, Handle } from 'react-flow-renderer';
import { useWindowDimensions } from '../../utils/hooks';

const defaultNodeStyles = {
  borderWidth: 2,
  fontSize: 13,
};

const inputStyle = {
  ...defaultNodeStyles,
  borderColor: 'darkgray',
};

const handlerStyles = {
  bottom: {
    top: '85%',
    width: '100%',
    height: 14,
    borderRadius: 0,
    opacity: 0,
  },
  top: {
    top: -6,
    width: '100%',
    height: 14,
    borderRadius: 0,
    opacity: 0,
  },
};

const inputElement = {
  id: 'input',
  type: 'input',
  data: { label: 'Input' },
  position: { x: 250, y: 100 },
  style: inputStyle,
};

export const createNode = (id, nodeType, text) => ({
  id: id.toString(),
  type: nodeType,
  data: { label: text },
  position: { x: 200, y: 200 },
  isHidden: false,
});

const InputNode = ({ data }) => (
  <Box paddingLeft="10px" paddingRight="10px">
    <Text color="black">{data.label}</Text>
    <Handle
      type="source"
      position="bottom"
      id="b"
      style={{ ...handlerStyles.bottom, backgroundColor: 'black' }}
    />
  </Box>
);

const OutputNode = ({ data }) => (
  <Box paddingLeft="10px" paddingRight="10px">
    <Text color="black">{data.label}</Text>
    <Handle
      type="target"
      position="top"
      id="b"
      style={handlerStyles.top}
    />
  </Box>
);

const AugmentationNode = ({ data }) => (
  <Flex
    minWidth="150px"
    height="45px"
    alignItems="center"
    backgroundColor="white"
    paddingLeft="10px"
    paddingRight="10px"
    borderWidth={2}
    borderColor="green"
    boxShadow="md"
    borderRadius={3}
  >
    <Text width="100%" textAlign="center" color="black" fontSize={13}>{data.label}</Text>
    <Handle
      type="target"
      position="top"
      id="a"
      style={{ ...handlerStyles.top, backgroundColor: 'green' }}
    />
    <Handle
      type="source"
      position="bottom"
      id="b"
      style={{ ...handlerStyles.bottom, backgroundColor: 'green' }}
    />
  </Flex>
);

const DataProcessingNode = ({ data }) => (
  <Flex
    minWidth="150px"
    height="45px"
    alignItems="center"
    backgroundColor="white"
    paddingLeft="10px"
    paddingRight="10px"
    borderWidth={2}
    borderColor="blue"
    boxShadow="md"
    borderRadius={3}
  >
    <Text width="100%" textAlign="center" color="black" fontSize={13}>{data.label}</Text>
    <Handle
      type="target"
      position="top"
      id="a"
      style={{ ...handlerStyles.top, backgroundColor: 'blue' }}
    />
    <Handle
      type="source"
      position="bottom"
      id="b"
      style={{ ...handlerStyles.bottom, backgroundColor: 'blue' }}
    />
  </Flex>
);

const InferenceNode = ({ data }) => (
  <Flex
    minWidth="150px"
    height="45px"
    alignItems="center"
    backgroundColor="white"
    paddingLeft="10px"
    paddingRight="10px"
    borderWidth={2}
    borderColor="yellow.300"
    boxShadow="md"
    borderRadius={3}
  >
    <Text width="100%" textAlign="center" color="black" fontSize={13}>{data.label}</Text>
    <Handle
      type="target"
      position="top"
      id="a"
      style={{ ...handlerStyles.top, backgroundColor: '#F6E05E' }}
    />
    <Handle
      type="source"
      position="bottom"
      id="b"
      style={{ ...handlerStyles.bottom, backgroundColor: '#F6E05E' }}
    />
  </Flex>
);

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  augmentation: AugmentationNode,
  inference: InferenceNode,
  dataProcessing: DataProcessingNode,
};

const PipelineGraph = ({ elements, onNodeRemove }) => {
  const { height } = useWindowDimensions();
  const [edges, setEdges] = useState([]);

  const onConnect = (params) => {
    const source = elements.find((node) => node.id == params.source);
    const target = elements.find((node) => node.id == params.target);

    if ((source.type === 'augmentation' || source.type === 'inference') && target.type === 'dataProcessing') {
      console.log('Augmentation and Inference nodes cannot be executed before data processing ones');
      return;
    }

    const newEdges = addEdge(params, edges);
    newEdges.forEach((edge) => {
      edge.arrowHeadType = 'arrowclosed';
      edge.style = { strokeWidth: 2 };
    });

    setEdges(newEdges);
  };

  const allElements = useMemo(() => [...elements, ...edges], [elements, edges]);

  return (
    <Flex width="100%" height={height - 120} color="white" fill="white">
      <ReactFlow
        minZoom={1}
        maxZoom={1}
        elements={allElements}
        onElementsRemove={onNodeRemove}
        paneMoveable={false}
        connectionLineStyle={{ strokeWidth: 2 }}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
      />
    </Flex>
  );
};

export default PipelineGraph;
