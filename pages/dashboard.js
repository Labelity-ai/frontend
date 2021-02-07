import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";

const Dashboard = () => {
  const [session, loading] = useSession();

  return (
    <VStack w="100%">
      <Box w="100%" h="100vh" bgColor="#161822">
        <Button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/login" })
          }
        >
          Sign Out
        </Button>
      </Box>
      <Text>{session && JSON.stringify(session, null, 3)}</Text>
    </VStack>
  );
};

export default Dashboard;
