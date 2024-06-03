import React from "react";
import {createRoot} from "react-dom/client";
import App from "./Container/App";
import "./index.scss";

let Container = document.getElementById("root");
createRoot(Container).render(<App />);
