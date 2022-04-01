import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { ToastContainer } from "react-toastify";

// redux
import { store, persistor } from "store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// styles
import { chakraTheme, tailwindTheme } from "utils/theme";
import "react-toastify/dist/ReactToastify.css";
import "assets/styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                There was an error!{" "}
                <button onClick={() => resetErrorBoundary()}>Try again</button>
              </div>
            )}
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <ChakraProvider theme={chakraTheme}>
                    <ThemeProvider theme={tailwindTheme}>
                      <ToastContainer />
                      <App />
                    </ThemeProvider>
                  </ChakraProvider>
                </BrowserRouter>
              </PersistGate>
            </Provider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
