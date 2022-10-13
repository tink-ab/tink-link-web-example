import React from "react";
import { Button } from "reactstrap";

export const AuthorizationLink = ({ locale, market, scope }) => {
  const link =
    "https://link.tink.com/1.0/authorize/?" +
    "client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&redirect_uri=http://localhost:3000/callback" +
    "&scope=" +
    scope +
    ssnData +
    "&market=" +
    market +
    "&locale=" +
    locale;

  return <Button href={link}>Connect Bank</Button>;
};
