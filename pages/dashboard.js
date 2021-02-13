import { HStack, Text, Flex, Box, Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import { getSite } from "../utils";
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const callbackUrl = `${getSite()}/login`;

  if (loading) return "";
  
  if (!session) {
    router.push(callbackUrl);
    return null;
  }

  return (
    <HStack spacing="0">
      <Box minH="100vh" bgColor="#d9def0" w="300px">
        <Flex justifyContent="center">
          <Button
            onClick={() =>
              signOut({ callbackUrl })
            }
          >
            Sign Out
          </Button>
        </Flex>
      </Box>
      <Box minH="100vh" bgColor="#161822" w="100%">
        <Text color="#d9def0">
          {session && JSON.stringify(session, null, 3)}
          {session && console.log(session)}
        </Text>
      </Box>
    </HStack>
  );
};

export default Dashboard;
