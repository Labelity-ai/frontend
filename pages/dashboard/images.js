import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Button,
} from '@chakra-ui/react';

import { FaFileImport } from 'react-icons/fa';
import DashboardContainer from '../../components/DashboardContainer';
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
          <Tab>Images</Tab>
          <Button
            marginTop="auto"
            marginBottom="auto"
            size="sm"
            marginLeft="auto"
            marginRight="20px"
            onClick={() => setUploadImagesModalOpen(true)}
            leftIcon={<FaFileImport />}
          >
            Upload Images
          </Button>
        </TabList>
        <TabPanels height="95vh">
          <TabPanel height="100%">
            <DashboardContainer />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
