import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";
import "./styles/didactic-revision.css";
import "./styles/genres.css";
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
