import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/redux/store";
import { ToastProvider } from "@/components/Toast";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { BookingProvider } from "@/modules/hebergements/booking/BookingContext";

//Production de Providers, Redux Provider, React Query Provider, Router, ErrorBoundary
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <BookingProvider>
              <ToastProvider>{children}</ToastProvider>
            </BookingProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}
