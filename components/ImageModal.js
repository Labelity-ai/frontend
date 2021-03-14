import React from 'react';
import { store, view } from '@risingstack/react-easy-state';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
  Spacer,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  TagRightIcon,
  Code,
  HStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Store from '../utils/store';
import AnnotatedImage from './AnnotatedImage';
import LabelsTree from './SideNavigation/LabelsTree';
import { fetchProjectLabels } from '../utils/api';

const ImagesModal = ({ imageData, isOpen, onClose }) => {
  const labelsStore = store({ hiddenLabels: {} });

  const {
    attributes, thumbnailUrl, eventId, imageWidth, imageHeight,
  } = imageData;

  const { data: projectLabels } = useQuery(
    ['projectLabels', Store.selectedProject],
    () => Store.selectedProject && fetchProjectLabels(Store.selectedProject),
  );

  const downloadJsonFile = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(imageData, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${eventId.split('.')[0]}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" height="70vh" backgroundColor="gray.900">
        <ModalHeader textColor="white">{eventId}</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody
          backgroundColor="gray.900"
          display="flex"
          height="100%"
          alignItems="end"
          justifyContent="flex-end"
        >
          <Flex
            direction="column"
            height="100%"
            justifyContent="start"
            alignItems="start"
            width="65%"
            paddingTop="0px"
            paddingBottom="30px"
          >
            <AnnotatedImage
              annotations={imageData}
              imageUrl={thumbnailUrl}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              labelColors={Store.labelColors}
              hiddenLabels={labelsStore.hiddenLabels}
              objectFit="contain"
              style={{
                position: 'absolute', left: 20, top: '12%', width: 650, height: 500, backgroundColor: 'black',
              }}
            />
            <Spacer />
            <Button colorScheme="red" rightIcon={<FaTrash />}>Remove</Button>
          </Flex>
          <Flex direction="column" height="100%" alignItems="start" width="35%" paddingTop="0px" paddingBottom="30px">
            <Text color="white" fontSize="xl" fontWeight="bold" marginBottom="10px">Attributes</Text>
            {_.map(attributes, (value, key) => (
              <Flex width="100%" justifyContent="space-between" marginBottom="20px">
                <Text color="white" fontWeight="medium">{key}</Text>
                <Text color="white">{value}</Text>
              </Flex>
            ))}
            <Text marginTop="30px" marginBottom="10px" color="white" fontSize="xl" fontWeight="bold">Tags</Text>

            <HStack spacing={3}>
              {['sm', 'sm', 'sm'].map((size, i) => (
                <Tag
                  size={size}
                  key={size}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                >
                  <TagLabel>
                    Tag
                    {i}
                  </TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
              <Button variant="link">
                <Tag
                  size="sm"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="whiteAlpha"
                >
                  <TagLabel>Add Tag</TagLabel>
                  <TagRightIcon boxSize="12px" as={FaPlus} />
                </Tag>
              </Button>
            </HStack>

            <Text marginTop="30px" marginBottom="10px" color="white" fontSize="xl" fontWeight="bold">Labels</Text>
            <LabelsTree labels={projectLabels || []} labelsStore={labelsStore} />
            <Spacer />
            <Flex width="100%" alignItems="flex-end" justifyContent="space-around">
              <Button colorScheme="whiteAlpha" onClick={downloadJsonFile}>Download JSON</Button>
              <Button colorScheme="whiteAlpha">Download Original</Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default view(ImagesModal);
