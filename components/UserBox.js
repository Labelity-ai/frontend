import { Flex, Image, VStack, HStack, Text } from "@chakra-ui/react";

const UserBox = ({ user }) => {
  const { name, email, image } = user;

  return (
    <Flex justify="center" align="center">
      <HStack spacing="15px">
        <Image borderRadius="full" boxSize="48px" src={image} />
        <VStack align="start" spacing="2px">
          <Text fontWeight="bold" fontSize="md">
            {name}
          </Text>
          <Text fontSize="xs">{email}</Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default UserBox;
