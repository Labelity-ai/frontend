import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Button,
} from '@chakra-ui/react';

import { FaFileImport } from 'react-icons/fa';
import DashboardContainer from '../../components/DashboardContainer';
import QueryBuilderTab from '../../components/QueryBuilderTab';
import ImportAnnotationsModal from '../../components/ImportAnnotationsModal';
import ImportImagesModal from '../../components/ImportImagesModal';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [uploadImagesModalOpen, setUploadImagesModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <ImportAnnotationsModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />
      <ImportImagesModal
        open={uploadImagesModalOpen}
        onClose={() => setUploadImagesModalOpen(false)}
      />
      <Tabs height="100vh" width="100%">
        <TabList paddingLeft="20px">
          <Tab>Image View</Tab>
          <Tab>Query Builder</Tab>
          <Button
            marginTop="auto"
            marginBottom="auto"
            size="sm"
            marginLeft="auto"
            onClick={() => setUploadImagesModalOpen(true)}
            leftIcon={<FaFileImport />}
          >
            Upload Images
          </Button>
          <Button
            marginTop="auto"
            marginBottom="auto"
            size="sm"
            marginLeft="10px"
            marginRight="20px"
            onClick={() => setImportModalOpen(true)}
            leftIcon={<FaFileImport />}
          >
            Import Annotations
          </Button>
        </TabList>
        <TabPanels height="95vh">
          <TabPanel height="100%">
            <DashboardContainer />
          </TabPanel>
          <TabPanel>
            <QueryBuilderTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
