import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import SideNavigation from "../components/SideNavigation";
import DashboardContainer from "../components/DashboardContainer";

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (!loading && !session) router.push("/login");
  }, [session, loading]);

  if (loading) return null;

  return (
    <HStack spacing="0">
      <Box minH="100vh" bgColor="#d9def0" w={1/6}>
        <SideNavigation />
      </Box>
      <Box minH="100vh" bgColor="#161822" w={5/6}>
        <DashboardContainer />
      </Box>
    </HStack>
  );
};

export default Dashboard;

//import AnnotatedImage from "../components/AnnotatedImage";
//import { getRandomColors } from "../utils/colors";

/*const labelColors = {
  label1: getRandomColors(1)[0],
  car: getRandomColors(1)[0],
  label2: getRandomColors(1)[0],
};*/

/*{
  <AnnotatedImage
    imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-rs7-112-1569274021.jpg"
    imageWidth={350}
    imageHeight={250}
    labelColors={labelColors}
    annotations={{
      detections: [{ box: [0.3, 0.3, 0.7, 0.7], label: "car", attributes: {} }],
      points: [
        { points: [0.3, 0.3, 0.7, 0.7], label: "label1", attributes: {} },
      ],
      polygons: [
        {
          points: [0.3, 0.3, 0.7, 0.7, 0.1, 0.2],
          label: "label2",
          attributes: {},
        },
      ],
      polylines: [],
    }}
  />;
}*/
