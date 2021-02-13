import {
  Button,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Box,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const LoginForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Not implemented");
      }}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel color="#d9def0">Email address</FormLabel>
          <Input
            name="email"
            focusBorderColor="#4a61dd"
            color="#d9def0"
            type="email"
            autoComplete="email"
            required
          />
        </FormControl>
        <FormControl id="password">
          <Flex justify="space-between">
            <FormLabel color="#d9def0">Password</FormLabel>
            <Box
              as="a"
              href="#"
              color="blue.400"
              fontWeight="semibold"
              fontSize="sm"
            >
              Forgot Password?
            </Box>
          </Flex>
          <Input
            name="password"
            color="#d9def0"
            focusBorderColor="#4a61dd"
            type="password"
            autoComplete="current-password"
            required
          />
        </FormControl>
        <Button
          type="submit"
          bgColor="#4a61dd"
          color="#d9def0"
          _hover={{ bg: "#4a61dd" }}
          size="lg"
          fontSize="md"
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
