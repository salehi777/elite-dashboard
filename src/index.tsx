import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { ToastContainer } from "react-toastify";

// styles
import { chakraTheme, tailwindTheme } from "utils/theme";
import "react-toastify/dist/ReactToastify.css";
import "assets/styles/index.css";

const queryClient = new QueryClient();

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
            <RecoilRoot>
              <BrowserRouter>
                <ChakraProvider theme={chakraTheme}>
                  <ThemeProvider theme={tailwindTheme}>
                    <ToastContainer />
                    <App />
                  </ThemeProvider>
                </ChakraProvider>
              </BrowserRouter>
            </RecoilRoot>
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
