import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ConfirmProvider from "./components/ConfirmProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfirmProvider>
          <Router>
            <App />
          </Router>
        </ConfirmProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
