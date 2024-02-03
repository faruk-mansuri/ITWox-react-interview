'use client';
import '@tamagui/core/reset.css';

import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import { useUser } from './hooks/useUser';

export default function App({ children }) {
  const user = useUser();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60 * 1000 * 5 } },
      })
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/user/current-user');
        user.setUser(response.data.user);
      } catch (error) {
        return;
      }
    };
    getUser();
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
