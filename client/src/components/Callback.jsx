import React from "react";
import { Button } from "reactstrap";
import { Header } from "./Header";
import { FinancialOverview } from "./FinancialOverview";
import { useCallback } from "../hooks/useCallback";

const getHeaderProps = error =>
  error
    ? {
        text: "Something went wrong",
        emoji: "sad"
      }
    : {
        text: "Your bank was successfully connected!",
        emoji: "tada"
      };

export const Callback = () => {
  const { loading, error, data } = useCallback(window.location);
  const message = new URLSearchParams(location).get("message");
  const headerProps = getHeaderProps(error);

  return (
    <div>
      <Header {...headerProps} />
      <FinancialOverview loading={loading} data={data} error={error} />
      <p style={{ fontSize: "18px", paddingTop: "40px" }}>{message}</p>
      <Button style={{ margin: "30px" }} href="/">
        Take me back
      </Button>
    </div>
  );
};
