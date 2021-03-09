import * as React from 'react';
import { Provider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import { view } from '@risingstack/react-easy-state';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  </ChakraProvider>
);

export default view(App);
