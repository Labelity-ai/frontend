import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";

const DividerWithText = (props) => (
  <Flex align="center" {...props}>
    <Box flex="1">
      <Divider />
    </Box>
    <Box as="span" px="3" color="#d9def0" fontWeight="medium">
      {props.children}
    </Box>
    <Box flex="1">
      <Divider />
    </Box>
  </Flex>
);

export default DividerWithText;
