import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import SideNavigation from '../components/SideNavigation';

const DashboardLayout = ({ children }) => {
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
      {children}
    </HStack>
  );
};

export default DashboardLayout;
