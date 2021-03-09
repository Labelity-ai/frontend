import React from 'react';
import { signOut, useSession } from 'next-auth/client';
import {
  Flex, Button, VStack, Divider, Text, Stack,
} from '@chakra-ui/react';
import {
  FaImages, FaCog, FaToolbox, FaDatabase, FaBook,
} from 'react-icons/fa';
import ProjectSelector from './ProjectSelector';
import NavigationButton from './NavigationButton';
import LabelsTree from './LabelsTree';

const SideNavigation = () => {
  const [session] = useSession();

  return (
    <Flex
      direction="column"
      justify="space-between"
      padding="20px"
      justifyContent="center"
      height="100vh"
      width="300px"
      flexGrow={1}
    >
      <VStack spacing="15px" width="100%" height="100%">
        <ProjectSelector {...session} />
        <VStack align="start" width="100%" spacing="10px">
          <Text paddingLeft="16px" width="100%" textAlign="left" fontSize={14} color="gray.400">DATA MANAGEMENT</Text>
          <NavigationButton
            name="Datasets"
            icon={<FaBook color="gray.300" />}
            to="/dashboard/datasets"
          />
          <NavigationButton
            name="Images"
            icon={<FaImages color="gray.300" />}
            to="/dashboard/images"
          />
          <NavigationButton
            name="Annotations"
            icon={<FaDatabase color="gray.300" />}
            to="/dashboard/annotations"
          />
          <NavigationButton
            name="Integrations"
            icon={<FaToolbox color="gray.300" />}
            to="/dashboard/integrations"
          />
        </VStack>
        <Divider />
        <Text paddingLeft="16px" width="100%" textAlign="left" fontSize={14} color="gray.400">LABELS</Text>
        <LabelsTree />
      </VStack>
      <Stack flex={1} width="100%" spacing="15px" direction="column">
        <NavigationButton
          textColor={undefined}
          colorScheme="whiteAlpha"
          name="Settings"
          icon={<FaCog color="gray.300" />}
          to="/settings"
        />
        <Divider />
        <Button
          width="100%"
          variant="link"
          colorScheme="red"
          opacity={0.7}
          onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/login` })}
        >
          Sign Out
        </Button>
      </Stack>
    </Flex>
  );
};

export default SideNavigation;
