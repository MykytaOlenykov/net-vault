import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retryDelay: 60 * 1000,
    },
  },
});

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  return <Provider client={queryClient}>{children}</Provider>;
}
