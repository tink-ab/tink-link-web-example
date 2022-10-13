import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Callback } from "./Callback";
import { Main } from "./Main";

export const App = () => (
  <Container>
    <Row>
      <Col>
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
      </Col>
    </Row>
    <Row className="app">
      <Col lg={{ size: 8, offset: 2 }} style={{ paddingTop: "70px" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main/>} />
            <Route exact path="/callback" element={<Callback/>} />
          </Routes>
        </BrowserRouter>
      </Col>
    </Row>
  </Container>
);

export default App;
