import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";

const SignIn = () => {
  const [session, loading] = useSession();

  return (
    <VStack w="100%">
      <Box w="100%" h="100%" bgColor="#161822">
        {!session && (
          <Button onClick={() => signIn()}>Sign In With GitHub</Button>
        )}
        {session && <Button onClick={() => signOut()}>Sign Out</Button>}
      </Box>
      <Text>{session && JSON.stringify(session, null, 3)}</Text>
    </VStack>
  );
};

export default SignIn;
