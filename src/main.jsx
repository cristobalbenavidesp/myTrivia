import React from "react";
import ReactDOM from "react-dom/client";
import TriviaContextProvider from "./context/TriviaContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TriviaContextProvider>
      <App />
    </TriviaContextProvider>
  </React.StrictMode>
);
