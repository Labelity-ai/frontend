import React from 'react';
import { HStack, Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SideNavigation from '../components/SideNavigation';
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
      <Box minH="100vh" bgColor="#d9def0" w={1 / 6}>
        <SideNavigation />
      </Box>
      <Box minH="100vh" bgColor="#161822" w={5 / 6}>
        <DashboardContainer />
      </Box>
    </HStack>
  );
};

export default Dashboard;
