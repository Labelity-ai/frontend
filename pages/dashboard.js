import React from 'react';
import {
  HStack, Text, Flex, Box, Button,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import AnnotatedImage from '../components/AnnotatedImage';
import { getRandomColors } from '../utils/colors';

const labelColors = {
  label1: getRandomColors(1)[0],
  car: getRandomColors(1)[0],
  label2: getRandomColors(1)[0],
  tag1LongName: getRandomColors(1)[0],
  tag1: getRandomColors(1)[0],
};

const Dashboard = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  React.useEffect(() => {
    // if (!loading && !session) router.push("/login");
  }, [session, loading]);

  if (loading) return null;

  return (
    <HStack spacing="0">
      <Box minH="100vh" bgColor="#d9def0" w="300px">
        <Flex justifyContent="center">
          <Button onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/login` })}>
            Sign Out
          </Button>
        </Flex>
      </Box>
      <Box minH="100vh" bgColor="#161822" w="100%">
        <Text color="#d9def0">
          {session && JSON.stringify(session, null, 3)}
          {session && console.log(session)}
        </Text>

        <AnnotatedImage
          imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-rs7-112-1569274021.jpg"
          imageWidth={350}
          imageHeight={250}
          labelColors={labelColors}
          annotations={{
            detections: [{ box: [0.3, 0.3, 0.7, 0.7], label: 'car', attributes: {} }],
            points: [{ points: [0.3, 0.3, 0.7, 0.7], label: 'label1', attributes: {} }],
            polygons: [{ points: [0.3, 0.3, 0.7, 0.7, 0.1, 0.9], label: 'label2', attributes: {} }],
            polylines: [],
            tags: [{ label: 'tag1LongName' }, { label: 'tag1LongName' }],
          }}
        />

        <AnnotatedImage
          imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-audi-rs7-112-1569274021.jpg"
          imageWidth={350}
          imageHeight={250}
          labelColors={labelColors}
          annotations={{
            detections: [{ box: [0.3, 0.3, 0.7, 0.7], label: 'car', attributes: {} }],
            points: [{ points: [0.3, 0.3, 0.7, 0.7], label: 'label1', attributes: {} }],
            polygons: [{ points: [0.3, 0.3, 0.7, 0.7, 0.1, 0.9], label: 'label2', attributes: {} }],
            polylines: [],
            tags: [{ label: 'tag1LongName' }, { label: 'tag1LongName' }, { label: 'tag1' }],
          }}
        />
      </Box>
    </HStack>
  );
};

export default Dashboard;
