import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Meds from "./pages/Meds";
import Mood from "./pages/Mood";
import Task from "./pages/Task";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import "./index.css";

import TaskViewer from "./components/menus/TaskViewer";
import { taskContext } from "./hooks/contexts";

import { initializeAdMob } from "@/utils/ads";
import { initializeNotifications } from "./utils/notifs";

/* define the query client for react-query */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [context, setContext] = useState({
    task: {
      active: {
        date: new Date(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        menus: [],
      },
      menus: {
        dailyTasks: false,
        generalTasks: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <taskContext.Provider value={[context, setContext]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Task />} />
              <Route path="/task/view/:id" element={<TaskViewer />} />
              {/* <Route path="/meds" element={<Meds />} /> */}
              {/* <Route path="/mood" element={<Mood />} /> */}
              <Route path="/task" element={<Task />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </taskContext.Provider>
    </QueryClientProvider>
  );
}

async function initialize() {
  await initializeAdMob();
  await initializeNotifications();
}

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

initialize().catch((error) => console.error(error));
