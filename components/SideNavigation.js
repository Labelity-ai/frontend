import React from "react";
import { signOut, useSession } from "next-auth/client";
import { Flex, Button, VStack, Divider } from "@chakra-ui/react";
import UserBox from "./UserBox";
import NavigationButton from "./NavigationButton";
import { FaImages, FaProjectDiagram, FaStickyNote } from "react-icons/fa";

const SideNavigation = () => {
  const [session] = useSession();

  return (
    <Flex justify="start" m="30px">
      <VStack spacing="15px">
        <UserBox {...session} />
        <Divider />
        <VStack align="start" w="100%" spacing="15px">
          <NavigationButton
            name={"Projects"}
            icon={<FaProjectDiagram />}
            to={"/dashboard/projects"}
          />
          <NavigationButton
            name={"Datasets"}
            icon={<FaImages />}
            to={"/dashboard/datasets"}
          />
          <NavigationButton
            name={"Annotations"}
            icon={<FaStickyNote />}
            to={"/dashboard/annotations"}
          />
        </VStack>
        <Divider />
        <Button
          onClick={() =>
            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/login` })
          }
        >
          Sign Out
        </Button>
      </VStack>
    </Flex>
  );
};

export default SideNavigation;
