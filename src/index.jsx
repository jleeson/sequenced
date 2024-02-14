import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Meds from "./pages/Meds";
import Mood from "./pages/Mood";
import ToDo from "./pages/ToDo";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import "./index.css";
import ToDoAddMenu from "./components/menus/ToDoAdd/ToDoAddMenu";
import ToDoViewer from "./components/menus/ToDoViewer";
import { ToDoContext } from "./hooks/contexts";

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
    todo: {
      active: {
        date: new Date(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        menus: []
      },
      menus: {
        dailyTasks: false,
        generalTasks: false
      }
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ToDoContext.Provider value={[context, setContext]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ToDo />} />
              <Route path="/todo/add" element={<ToDoAddMenu />} />
              <Route path="/todo/view/:id" element={<ToDoViewer />} />
              {/* <Route path="/meds" element={<Meds />} /> */}
              {/* <Route path="/mood" element={<Mood />} /> */}
              <Route path="/todo" element={<ToDo />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToDoContext.Provider>
    </QueryClientProvider>
  );
}

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
