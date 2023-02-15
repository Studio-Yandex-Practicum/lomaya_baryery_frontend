import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10 * 60 * 1000 } },
});

export function withServerState(
  WrappedComponent: React.ComponentType,
): React.FunctionComponent {
  return function wrappedComponenet() {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent />
      </QueryClientProvider>
    );
  };
}
