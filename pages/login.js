import {
  Heading,
  Box,
  Button,
  Text,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { signIn, useSession } from "next-auth/client";
import { FaGithub, FaGitlab, FaAtlassian } from "react-icons/fa";
import LoginForm from "../components/LoginForm";
import DividerWithText from "../components/DividerWithText";
import { useRouter } from "next/router";

const providers = [
  {
    id: "github",
    name: "GitHub",
    color: "#ffffff",
    icon: <FaGithub />,
  },
  {
    id: "gitlab",
    name: "GitLab",
    color: "#fa7035",
    textColor: "white",
    icon: <FaGitlab />,
  },
  {
    id: "atlassian",
    name: "Atlassian",
    color: "#0052cc",
    textColor: "white",
    icon: <FaAtlassian />,
  },
];

const Login = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (!loading && session) router.push("/dashboard");
  }, [session, loading]);

  if (loading) return null;

  return (
    <Box bgColor="#161822" minH="100vh" py="12" px={{ sm: "6", lg: "8" }}>
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} w={{ sm: "full" }}>
        <Box mb={{ base: "10", md: "20" }}>
          <Image mx="auto" boxSize="60%" align="center" src="./logo.png" />
        </Box>
        <Heading
          mt="6"
          color="#d9def0"
          textAlign="center"
          size="xl"
          fontWeight="extrabold"
        >
          Sign in to your account
        </Heading>
        <Text
          mt="4"
          color="#d9def0"
          align="center"
          maxW="md"
          fontWeight="medium"
        >
          <span>Don't have an account?</span>
          <Box
            as="a"
            marginStart="1"
            href="#"
            color="blue.400"
            display={{ base: "block", sm: "revert" }}
          >
            Start free trial
          </Box>
        </Text>
      </Box>
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="2" w={{ sm: "full" }}>
        <Box
          bgColor="#161822"
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
        >
          <LoginForm />
          <DividerWithText mt="6">or</DividerWithText>
          <SimpleGrid mt="6" columns={1} spacing="3">
            {providers.map(({ id, name, icon, textColor, color }) => (
              <Button
                key={id}
                leftIcon={icon}
                bgColor={color}
                color={textColor}
                _hover={{ bg: color }}
                variant="solid"
                onClick={() =>
                  signIn(id, {
                    callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/dashboard`,
                  })
                }
              >
                Sign in with {name}
              </Button>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
