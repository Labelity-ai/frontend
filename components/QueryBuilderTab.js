import React, { useState, useCallback } from 'react';
import {
  Flex,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Divider,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { FaPlay, FaPlus } from 'react-icons/fa';
import _ from 'lodash';

import { useQuery } from 'react-query';
import PipelineGraph from './PipelineGraph';
import Store from '../utils/store';
import { fetchStagesJSONSchema } from '../utils/api';
import GenericForm from './StageForms/GenericForm';
import { createNode } from './PipelineGraph/PipelineGraph';

const QueryBuilderTag = () => {
  const [session, loading] = useSession();
  const [dataProcessingModalOpen, setDataProcessingModalOpen] = useState(false);
  const [augmentationModalOpen, setAugmentationModalOpen] = useState(false);
  const [outputModalOpen, setOutputModalOpen] = useState(false);
  const [formId, setFormId] = useState(null);
  const [nodes, setNodes] = useState([]);

  const { data: stagesSchemas } = useQuery('stagesSchemas', fetchStagesJSONSchema);

  React.useEffect(() => {
    Store.stagesSchemas = stagesSchemas;
    console.log(_.keys(stagesSchemas));
  }, [stagesSchemas]);

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  const onClose = useCallback(() => {
    setAugmentationModalOpen(false);
    setDataProcessingModalOpen(false);
    setOutputModalOpen(false);
    setFormId(null);
  }, []);

  const handleOnNodeButtonClick = (nodeType, text) => () => {
    setNodes((n) => [...n, createNode(n.length, nodeType, text)]);
    onClose();
  };

  return (
    <Flex height="100%" width="100%" flex={1} justifyContent="space-between" direction="column">
      <PipelineGraph elements={nodes} />
      <Modal
        isOpen={dataProcessingModalOpen || augmentationModalOpen || outputModalOpen}
        onClose={onClose}
        width="80%"
        maxWidth="90vh"
      >
        <ModalOverlay />
        <ModalContent maxWidth="90vh">
          <ModalHeader>Add Node</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {formId && <GenericForm schema={Store.stagesSchemas[formId]} />}

            {dataProcessingModalOpen && !formId && (
              <>
                <Divider />
                <VStack
                  shouldWrapChildren
                  wrap="wrap"
                  maxHeight="30vh"
                  alignItems="flex-start"
                  spacing="10px"
                  align="start"
                  width="100%"
                >
                  {_.keys(Store.stagesSchemas).map((key, i) => (
                    <Button
                      key={key}
                      marginTop={i ? '0px' : '10px'}
                      variant="ghost"
                      onClick={handleOnNodeButtonClick('dataProcessing', Store.stagesSchemas[key].title)}
                    >
                      {Store.stagesSchemas[key].title}
                    </Button>
                  ))}
                </VStack>
              </>
            )}

            {augmentationModalOpen && !formId && (
            <>
              <VStack
                shouldWrapChildren
                wrap="wrap"
                maxHeight="30vh"
                alignItems="flex-start"
                spacing="10px"
                align="start"
                width="100%"
              >
                <Divider />
                <Button variant="ghost">Flip</Button>
                <Button variant="ghost">Affine Transformation</Button>
                <Button variant="ghost">Mixup</Button>
                <Button variant="ghost">GaussianBlur</Button>
              </VStack>
            </>
            )}

            {outputModalOpen && !formId && (
              <>
                <VStack alignItems="flex-start" align="start" width="100%" spacing="10px">
                  <Divider />
                  <Button variant="ghost" onClick={handleOnNodeButtonClick('output', 'Annotation Task')}>
                    Annotation Task
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleOnNodeButtonClick('output', 'Dataset')}
                  >
                    Dataset
                  </Button>
                  <Button variant="ghost" onClick={handleOnNodeButtonClick('output', 'Annotations Database')}>
                    Annotations Database
                  </Button>
                </VStack>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack width="100%" justifyContent="space-between" zIndex={100}>
        <Menu>
          <MenuButton maxWidth={120} as={Button} leftIcon={<FaPlus />}>
            Add Node
          </MenuButton>
          <MenuList>
            <MenuGroup title="Node Type">
              <MenuItem onClick={() => setDataProcessingModalOpen(true)}>
                Data Processing Node
              </MenuItem>
              <MenuItem onClick={() => setAugmentationModalOpen(true)}>Augmentation Node</MenuItem>
              <MenuItem onClick={() => setDataProcessingModalOpen(true)}>Inference Node</MenuItem>
              <MenuItem onClick={() => setOutputModalOpen(true)}>Output Node</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <Button leftIcon={<FaPlay />}>Run Pipeline</Button>
      </HStack>
    </Flex>
  );
};

export default QueryBuilderTag;
