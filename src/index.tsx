import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Persistor, store } from "./redux/rootReducer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
