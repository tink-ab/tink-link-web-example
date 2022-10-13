import React from "react";

export const AuthorizationLink = ({ locale, market, scope }) => {
  const url = new URL("https://link.tink.com/1.0/authorize");
  url.searchParams.set("client_id", process.env.REACT_APP_CLIENT_ID);
  url.searchParams.set("redirect_uri", "http://localhost:3000/callback");
  url.searchParams.set("scope", scope);
  url.searchParams.set("market", market);
  url.searchParams.set("locale", locale);

  return <a href={url.toString()}>Connect Bank</a>;
};
