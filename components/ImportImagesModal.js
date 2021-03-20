import React from 'react';
import AwsS3 from '@uppy/aws-s3';
import { DashboardModal, useUppy } from '@uppy/react';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { getSignedUrlForImageUpload } from '../utils/api';
import Store from '../utils/store';

const uppyOptions = {
  restrictions: {
    maxFileSize: 10 * 1024 * 1024,
    allowedFileTypes: ['.jpg', '.jpeg', '.png', '.bmp'],
  },
};

const ImportImagesModal = ({ open, onClose }) => {
  const uppy = useUppy(() => new Uppy(uppyOptions)
    .use(AwsS3, {
      timeout: 60 * 1000,
      getUploadParameters: (file) => (
        getSignedUrlForImageUpload(file.name, file.type, Store.selectedProject)
      ),
    }));

  return (
    <DashboardModal
      open={open}
      onRequestClose={onClose}
      showProgressDetails
      uppy={uppy}
      showLinkToFileUploadResult={false}
      locale={{
        strings: {
          dropHereOr: 'Drop here or %{browse}',
          browse: 'browse',
          poweredBy2: '',
        },
      }}
    />
  );
};

export default ImportImagesModal;
