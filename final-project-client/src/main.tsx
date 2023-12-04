import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "@smastrom/react-rating/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
