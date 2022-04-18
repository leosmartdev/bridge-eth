import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { Provider as ReduxProvider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./utils/web3React";
import { SearchProvider } from "./contexts/SearchContext";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import App from "./App";
import { subscribePush } from "./subscription";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "zhack-pancake-forked-wallet-connector";
import { SnackbarProvider } from "notistack";
import { PersistGate } from "redux-persist/es/integration/react";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <SearchProvider>
        <ThemeContextProvider>
          <ModalProvider>
            <SnackbarProvider maxSnack={3}>
              <BrowserRouter>
                <ReduxProvider store={store.store}>
                  <PersistGate persistor={store.persistor}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <App />
                    </LocalizationProvider>
                  </PersistGate>
                </ReduxProvider>
              </BrowserRouter>
            </SnackbarProvider>
          </ModalProvider>
        </ThemeContextProvider>
      </SearchProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.register();
subscribePush();
