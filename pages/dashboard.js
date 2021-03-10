import React from 'react';
import {
  Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel, HStack
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
    <HStack height="100vh">
      <Box height="100vh" bgColor="gray.900">
        <SideNavigation />
      </Box>
      <Tabs height="100vh" width="100%">
        <TabList paddingLeft="20px">
          <Tab>Image View</Tab>
          <Tab>Query Builder</Tab>
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
