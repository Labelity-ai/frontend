import React from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const NavigationButton = ({ to, name, icon }) => (
  <Link href={to}>
    <Button variant="ghost" leftIcon={icon}>
      {name}
    </Button>
  </Link>
);

export default NavigationButton;
