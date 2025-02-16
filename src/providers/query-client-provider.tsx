'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryProvider,
} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const QueryClientProvider = ({ children }: Props) => {
  return (
    <TanstackQueryProvider client={queryClient}>
      {children}
    </TanstackQueryProvider>
  );
};

export default QueryClientProvider;
