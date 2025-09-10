import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Suspense } from "react";
import Home from "./Pages/Home";
import Layout from "./shared/Layout";
import Loader from "./shared/Loader";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
