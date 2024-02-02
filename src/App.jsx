// Modules
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Home from "./pages/Home";
import Meds from "./pages/Meds";
import Mood from "./pages/Mood";
import ToDo from "./pages/ToDo";

import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ToDo />} />
            {/* <Route path="/meds" element={<Meds />} /> */}
            {/* <Route path="/mood" element={<Mood />} /> */}
            <Route path="/todo" element={<ToDo />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
