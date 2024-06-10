import { StrictMode, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Meds from "./pages/Meds";
import Mood from "./pages/Mood";
import Task from "@/pages/Task";
import Settings from "./pages/Settings";
import Layout from "@/pages/Layout";
import NoPage from "@/pages/NoPage";

// Styles
import "./index.css";

import { initializeAdMob } from "@/utils/ads";
import { initializeNotifications } from "@/utils/notifs";

import { AppContext, useAppReducer } from "@/hooks/app";

/* define the query client for react-query */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// TODO: remove tempActiveDate.

export default function App() {
  const reducer = useAppReducer();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={reducer}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Task />} />
              <Route path="/task" element={<Task />} />
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
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
