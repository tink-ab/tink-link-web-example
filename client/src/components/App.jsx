import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Callback } from "./Callback";
import { Main } from "./Main";

export const App = () => (
  <div>
    <div>
      <div>
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "inline-flex",
            alignItems: "center",
            marginTop: 15
          }}
        >
          <span className="circle" />
          <h2 style={{ margin: 0 }}>Example</h2>
        </a>
      </div>
    </div>
    <div className="app">
      <div lg={{ size: 8, offset: 2 }} style={{ paddingTop: "70px" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/callback" element={<Callback/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </div>
);
