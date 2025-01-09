import React, {Suspense} from "react";
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import Header from "./components/Header.js";
import Home from "./pages/Home.js";

const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App(): React.ReactElement {
    return (
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                      path="/cart" element={
                          <Suspense fallback={<div>Loading...</div>}>
                              <Cart />
                          </Suspense>
                      }
                  />
                  <Route
                      path="*"
                      element={
                          <Suspense fallback={<div>Loading...</div>}>
                              <NotFound />
                          </Suspense>
                      }
                  />
              </Routes>
            </div>
          </div>
        </div>
    )
}

export default App;