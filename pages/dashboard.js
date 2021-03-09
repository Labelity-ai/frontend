import React from 'react';
import { HStack, Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SideNavigation from '../components/SideNavigation/SideNavigation';
import DashboardContainer from '../components/DashboardContainer';

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  return (
    <HStack spacing="0">
      <Box minH="100vh" bgColor="gray.900">
        <SideNavigation />
      </Box>
      <Box minH="100vh" bgColor="#161822" width="100%">
        <DashboardContainer />
      </Box>
    </HStack>
  );
};

export default Dashboard;
