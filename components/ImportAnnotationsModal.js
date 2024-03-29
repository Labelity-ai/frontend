import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import FileUpload from './FileUpload';

const ImportAnnotationsModal = ({ open, onClose }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      width="80%"
      maxWidth="90vh"
    >
      <ModalOverlay />
      <ModalContent maxWidth="90vh">
        <ModalHeader>Import annotations</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="35px">
          <FileUpload
            supportedMimeTypes={['.json', '.xml']}
            onAcceptedFilesChanged={setAcceptedFiles}
            infoText="(Only *.json, *.xml files will be accepted)"
            maxFiles={10}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImportAnnotationsModal;
