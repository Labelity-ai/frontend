import React from 'react';
import { useSession } from 'next-auth/client';
import { Text } from '@chakra-ui/react';

const DashboardContainer = (props) => {
  const [session] = useSession();

  return (
    <Text color="#d9def0">
      {session && JSON.stringify(session, null, 3)}
      {session && console.log(session)}
    </Text>
  );
};

export default DashboardContainer;
