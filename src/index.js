//Basic dependencies
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";

//Redux imports
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { persistor } from "./redux/store";

//Persist
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
