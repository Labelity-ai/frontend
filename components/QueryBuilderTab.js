import React from 'react';
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

import PipelineGraph from './PipelineGraph';

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  return (
    <Flex height="90vh" width="100%" flex={1} justifyContent="space-between" direction="column">
      <PipelineGraph />
      <Menu>
        <MenuButton as={Button} rightIcon={<FaPlus />} maxWidth={120}>
          Add Stage
        </MenuButton>
        <MenuList>
          <MenuItem>Select</MenuItem>
          <MenuItem>Exclude</MenuItem>
          <MenuItem>Map Labels</MenuItem>
          <MenuItem>Sort</MenuItem>
          <MenuItem>Limit</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Dashboard;
