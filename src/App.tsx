import React from "react";
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import NotFound from "./pages/NotFound.js";

function App(): React.ReactElement {
    return (
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
    )
}

export default App;