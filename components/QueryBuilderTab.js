import React from 'react';
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  HStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FaPlay, FaPlus } from 'react-icons/fa';

import PipelineGraph from './PipelineGraph';

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    // if (!loading && !session) router.push('/login');
  }, [session, loading]);

  if (loading) return null;

  return (
    <Flex height="100%" width="100%" flex={1} justifyContent="space-between" direction="column">
      <PipelineGraph />
      <HStack width="100%" justifyContent="space-between" zIndex={100}>
        <Menu>
          <MenuButton as={Button} leftIcon={<FaPlus />} maxWidth={120}>
            Add Node
          </MenuButton>
          <MenuList>
            <MenuGroup title="Stages">
              <MenuItem>Select</MenuItem>
              <MenuItem>Exclude</MenuItem>
              <MenuItem>Map Labels</MenuItem>
              <MenuItem>Sort</MenuItem>
              <MenuItem>Limit</MenuItem>
            </MenuGroup>
            <MenuGroup title="Outputs">
              <MenuItem>Annotation Task</MenuItem>
              <MenuItem>Dataset</MenuItem>
              <MenuItem>Annotations Database</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
        <Button leftIcon={<FaPlay />}>Run Pipeline</Button>
      </HStack>
    </Flex>
  );
};

export default Dashboard;
