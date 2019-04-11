import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import Header from "./Header";
import Spinner from "./Spinner";
import AccountsList from "./AccountsList";
import Investments from "./Investments";
import Transactions from "./Transactions";

export const Main = ({ location: { search } }) => {
  const [state, setState] = useState({
    code: new URLSearchParams(search).get("code"),
    token: new URLSearchParams(search).get("error"),
    errorMessage: new URLSearchParams(search).get("message"),
    data: undefined,
    error: undefined,
    loading: false
  });

  useEffect(() => {
    async function getData(code) {
      try {
        setState({
          ...state,
          loading: true
        });
        const response = await fetch("/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code })
        });

        const data = await response.json();

        if (response.status === 200) {
          return setState({
            ...state,
            loading: false,
            data
          });
        }

        return setState({
          ...state,
          loading: false,
          error: data.message
        });
      } catch (error) {
        return setState({
          ...state,
          loading: false,
          error: error.toString()
        });
      }
    }

    if (state.code) {
      getData(state.code);
    }
  }, []);

  const renderContent = () => {
    if (state.error) {
      return <noscript />;
    }

    if (state.loading) {
      return <Spinner width="50px" image={"./spinner.png"} />;
    }

    if (!state.data) {
      return <noscript />;
    }

    return (
      <Row>
        <Col lg={{ size: 6, offset: 3 }}>
          <AccountsList data={state.data} />
          <Investments data={state.data} />
          <Transactions data={state.data} />
        </Col>
      </Row>
    );
  };

  return (
    <div>
      {state.error ? (
        <Header text="Something went wrong" emoji="sad" />
      ) : (
        <Header text="Your bank was successfully connected!" emoji="tada" />
      )}
      {renderContent()}
      <p style={{ fontSize: "18px", paddingTop: "40px" }}>
        {state.errorMessage}
      </p>
      <Button style={{ margin: "30px" }} href="/">
        Take me back
      </Button>
    </div>
  );
};

export default Main;
