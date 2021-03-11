import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Button, Flex, VStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

const FileUpload = ({
  onAcceptedFilesChanged, supportedMimeTypes, infoText, ...rest
}) => {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setMyFiles([...myFiles, ...acceptedFiles]);
  }, [myFiles]);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({ onDrop, accept: supportedMimeTypes.join(', '), ...rest });

  useEffect(() => {
    onAcceptedFilesChanged(myFiles);
  }, [myFiles]);

  const removeFile = (file) => {
    const newFiles = myFiles.filter((x) => x !== file);
    setMyFiles(newFiles);
  };

  return (
    <Flex maxHeight="70vh">
      <Flex
        borderStyle="dashed"
        flexDirection="column"
        borderWidth={2}
        borderRadius={2}
        padding={20}
        alignItems="center"
        justifyContent="center"
        backgroundColor="#fafafa"
        width="100%"
        outline="none"
        cursor="pointer"
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>{infoText}</em>
      </Flex>
      {myFiles.length ? (
        <VStack width="100%" maxHeight="70vh" alignItems="start" overflowY="auto" overflowX="hidden">
          {myFiles.map((file) => (
            <Flex padding="3" mt="1">
              <Button marginLeft="auto" variant="link" onClick={() => removeFile(file)}>
                <FaTimes size={20} />
              </Button>
              <Box
                isTruncated
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                width="100%"
              >
                {file.name}
              </Box>
            </Flex>
          ))}
        </VStack>
      ) : null}
    </Flex>
  );
};

export default FileUpload;
