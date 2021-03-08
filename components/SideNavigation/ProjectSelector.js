import React from 'react';
import {
  Flex, Menu, MenuButton, MenuList, MenuItemOption, MenuDivider, MenuOptionGroup, Button,
} from '@chakra-ui/react';
import Identicon from 'react-identicons';

const ProjectSelector = ({ projects, user, selectedProject }) => {
  const { name, email, image } = user || {};

  return (
    <Flex justify="center" align="center" width="100%" marginBottom="25px">
      <Menu closeOnSelect>
        <MenuButton as={Button} colorScheme="whiteAlpha" backgroundColor="gray.600" width="100%" height="50px">
          <div style={{
            display: 'inline',
            position: 'absolute',
            left: 10,
            height: '100%',
            top: 10,
          }}
          >
            <Identicon string="project_id" size={32} style={{ display: 'inline' }} />
          </div>
          Project 1
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup title="Projects" type="radio">
            <MenuItemOption value="project_id">Project 1</MenuItemOption>
            <MenuItemOption value="project_id">Project 2</MenuItemOption>
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

export default ProjectSelector;
