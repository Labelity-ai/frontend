import React, { useEffect } from 'react';
import { signOut } from 'next-auth/client';
import {
  Button, Divider, Flex, Stack, Text, VStack, Spacer, Box, Image,
} from '@chakra-ui/react';
import {
  FaBook, FaCog, FaDatabase, FaImages, FaToolbox,
} from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { useQuery } from 'react-query';
import { view } from '@risingstack/react-easy-state';
import _ from 'lodash';

import ProjectSelector from './ProjectSelector';
import NavigationButton from './NavigationButton';
import LabelsTree from './LabelsTree';
import { fetchProjectLabels, fetchProjects } from '../../utils/api';
import Store from '../../utils/store';
import { getRandomColors } from '../../utils/colors';

const SideNavigation = () => {
  const { data: projects } = useQuery('projects', fetchProjects);
  const { data: projectLabels } = useQuery(
    ['projectLabels', Store.selectedProject],
    () => Store.selectedProject && fetchProjectLabels(Store.selectedProject),
  );

  const handleOnProjectSelected = (projectId) => {
    Store.selectedProject = projectId;
  };

  useEffect(() => {
    if (!Store.selectedProject && projects && projects.length) {
      Store.selectedProject = projects[0].id;
    }
  }, [Store.selectedProject, projects]);

  useEffect(() => {
    if (projectLabels) {
      const labelIds = _.sortBy(_.map(projectLabels, ({ shape, name }) => `${name}-${shape}`), (x) => x)
        .filter((id) => !Store.labelColors[id]);
      const newColors = _.zipObject(labelIds, getRandomColors(labelIds.length));
      Store.labelColors = { ...Store.labelColors, ...newColors };
    }
  }, [projectLabels]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      padding="20px"
      justifyContent="start"
      height="100vh"
      width="300px"
      flexGrow={1}
    >
      <Stack width="100%">
        <Image marginRight="auto" boxSize="45%" align="left" src="./logo.png" marginBottom="10px" />
        <ProjectSelector
          projects={projects || []}
          onProjectSelected={handleOnProjectSelected}
          selectedProjectId={Store.selectedProject}
        />
        <VStack align="start" width="100%" spacing="10px">
          <Text paddingLeft="16px" width="100%" textAlign="left" fontSize={14} color="gray.400">DATA MANAGEMENT</Text>
          <NavigationButton
            name="Annotations"
            icon={<FaDatabase color="gray.300" />}
            to="/dashboard/annotations"
          />
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
            name="Analytics"
            icon={<GoGraph color="gray.300" />}
            to="/dashboard/analytics"
          />
          <NavigationButton
            name="Integrations"
            icon={<FaToolbox color="gray.300" />}
            to="/dashboard/integrations"
          />
          <Divider />
          <Text
            paddingLeft="16px"
            marginBottom="10px"
            width="100%"
            textAlign="left"
            fontSize={14}
            color="gray.400"
          >
            LABELS
          </Text>
        </VStack>
      </Stack>
      <LabelsTree labels={projectLabels || []} />
      <Spacer />
      <Stack width="100%" spacing="15px" direction="column">
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

export default view(SideNavigation);
