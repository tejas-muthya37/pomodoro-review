import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PomodoroProvider } from "./Context/pomodoro-context";
import { TaskProvider } from "./Context/task-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PomodoroProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </PomodoroProvider>
  </React.StrictMode>
);
