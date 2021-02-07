import {
  VStack,
  Container,
  Image,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import { SiGithub, SiGitlab, SiAtlassian } from "react-icons/si";

const getProviderData = (provider) => {
  if (provider.id === "github")
    return { icon: <SiGithub />, color: "#ffffff", ...provider };
  if (provider.id === "gitlab")
    return { icon: <SiGitlab />, color: "#fa7035", ...provider };
  return { icon: <SiAtlassian />, color: "#0052cc", ...provider };
};

const Login = ({ providers }) => {
  const authProviders = Object.values(providers).map(getProviderData);

  return (
    <Box width="full" height="100vh" bgColor="#161822">
      <Image mx={300} src="./logo.png" w="200px" />
      <Container>
        <VStack spacing={10}>
          <Heading fontSize="52px" textColor="#d9def0">
            Sign in to Labelity
          </Heading>
          <VStack spacing={4}>
            {authProviders.map(({ id, name, icon, color }) => (
              <Button
                key={id}
                leftIcon={icon}
                w="250px"
                bgColor={color}
                variant="solid"
                onClick={() => signIn(id, { callbackUrl: "http://localhost:3000/dashboard" })}
              >
                Sign in with {name}
              </Button>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Login;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/auth/providers");
  const providers = await res.json();
  return { props: { providers } };
}
