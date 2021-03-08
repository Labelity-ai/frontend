import React from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const NavigationButton = ({
  to, name, icon, ...rest
}) => (
  <Link href={to}>
    <Button
      width="100%"
      variant="ghost"
      justifyContent="left"
      leftIcon={icon}
      textColor="gray.50"
      colorScheme="whiteAlpha"
      {...rest}
    >
      {name}
    </Button>
  </Link>
);

export default NavigationButton;
