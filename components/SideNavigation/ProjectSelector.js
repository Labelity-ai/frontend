import React, { useMemo } from 'react';
import {
  Flex, Menu, MenuButton, MenuList, MenuItemOption, MenuDivider, MenuOptionGroup, Button,
} from '@chakra-ui/react';
import { view } from '@risingstack/react-easy-state';
import Identicon from 'react-identicons';
import _ from 'lodash';

const styles = {
  identicon: {
    display: 'inline',
    position: 'absolute',
    left: 10,
    height: '100%',
    top: 10,
  },
};

const ProjectSelector = ({ projects, selectedProjectId, onProjectSelected }) => {
  const selectedProject = useMemo(
    () => _.find(projects, (project) => project.id === selectedProjectId),
    [selectedProjectId],
  );

  return (
    <Flex justify="center" align="center" width="100%" marginBottom="25px">
      <Menu closeOnSelect>
        <MenuButton as={Button} colorScheme="whiteAlpha" backgroundColor="gray.600" width="100%" height="50px">
          <div style={styles.identicon}>
            <Identicon
              string={selectedProjectId}
              size={32}
              style={{ display: 'inline' }}
            />
          </div>
          {(selectedProject && selectedProject.name) || ''}
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup title="Projects" type="radio" onChange={onProjectSelected}>
            {projects.map((project) => (
              <MenuItemOption value={project.id}>{project.name}</MenuItemOption>
            ))}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Options">
            <MenuItemOption value="project_settings" fontSize={14}>Add new project</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default view(ProjectSelector);
