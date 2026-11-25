import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from './app.router'
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.state';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { cheackAuthStatus } = useAuthStore();


  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: cheackAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    // refetchOnWindowFocus: true,
  });

  if (isLoading)
    return <CustomFullScreenLoading />

  return children;

}

export const TesloShopApp = () => {



  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CheckAuthProvider>
        <RouterProvider router={AppRouter} />
      </CheckAuthProvider>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )



}
