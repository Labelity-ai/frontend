import React from 'react';
import {
  HStack, Box, Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import SideNavigation from '../components/SideNavigation';
import DashboardContainer from '../components/DashboardContainer';
import QueryBuilderTab from '../components/QueryBuilderTab';

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  return (
    <HStack spacing="0">
      <Box height="100vh" bgColor="gray.900">
        <SideNavigation />
      </Box>
      <Box height="100vh" width="100%">
        <Tabs>
          <TabList paddingLeft="20px">
            <Tab>Image View</Tab>
            <Tab>Query Builder</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DashboardContainer />
            </TabPanel>
            <TabPanel>
              <QueryBuilderTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  );
};

export default Dashboard;
