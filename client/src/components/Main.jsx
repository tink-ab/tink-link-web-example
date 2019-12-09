import React, { useState } from "react";
import { Header } from "./Header";
import { AuthorizationLink } from "./AuthorizationLink";
import { BasicDropdown } from "./BasicDropdown";

export const Main = () => {
  const [market, setMarket] = useState("SE");
  const [locale, setLocale] = useState("en_US");
  return (
    <div>
      <Header text="Hello!" emoji="money" />

      <p>We can help you analyze your financial status.</p>
      <p>
        Or actually we can’t. We’re just a simple example app. But you can
        connect your bank to see your account data, transactions and
        investments!
      </p>

      <div style={{ padding: "50px 0 10px 0" }}>
        <BasicDropdown
          name="Choose a market"
          items={[
            "AT",
            "BE",
            "DE",
            "DK",
            "ES",
            "FI",
            "GB",
            "IT",
            "NL",
            "NO",
            "PT",
            "SE"
          ]}
          onSelect={setMarket}
          style={{ marginBottom: "30px" }}
        />
      </div>

      <div style={{ padding: "10px 0 50px 0" }}>
        <BasicDropdown
          name="Choose a locale"
          items={["en_US", "sv_SE", "da_DK", "no_NO", "fi_FI", "de_DE", "es_ES", "fr_FR"]}
          onSelect={setLocale}
          style={{ marginBottom: "30px" }}
        />
      </div>

      <AuthorizationLink
        scope="accounts:read,transactions:read,investments:read,user:read"
        market={market}
        locale={locale}
      />
    </div>
  );
};

export default Main;
