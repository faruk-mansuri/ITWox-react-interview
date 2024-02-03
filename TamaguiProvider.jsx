'use client';
import '@tamagui/core/reset.css';

import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppContext from './components/AppContext';
import { useState } from 'react';

export default function App({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60 * 1000 * 5 } },
      })
  );

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AppContext>{children}</AppContext>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
