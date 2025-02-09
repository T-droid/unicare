import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state/auth.ts";
import appReducer from "./state/app.ts";
import routingReducer from "./state/routing.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    routing: routingReducer,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
