import React, { useState } from 'react';
import {
  Box, Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Button,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { FaFileImport } from 'react-icons/fa';
import SideNavigation from '../components/SideNavigation';
import DashboardContainer from '../components/DashboardContainer';
import QueryBuilderTab from '../components/QueryBuilderTab';
import ImportAnnotationsModal from '../components/ImportAnnotationsModal';

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [importModalOpen, setImportModalOpen] = useState(false);

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  return (
    <HStack height="100vh">
      <ImportAnnotationsModal open={importModalOpen} onClose={() => setImportModalOpen(false)} />
      <Box height="100vh" bgColor="gray.900">
        <SideNavigation />
      </Box>
      <Tabs height="100vh" width="100%">
        <TabList paddingLeft="20px">
          <Tab>Image View</Tab>
          <Tab>Query Builder</Tab>
          <Button
            marginTop="auto"
            marginBottom="auto"
            size="sm"
            marginLeft="auto"
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
    </HStack>
  );
};

export default Dashboard;
