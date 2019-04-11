import React from "react";
import PropTypes from "prop-types";
import { getCurrency } from "../utils/getCurrency";
import { formatNumber } from "../utils/Format";

export const AccountsList = ({ data }) => {
  const hasAccounts = () =>
    data &&
    data.response &&
    data.response.accountData &&
    data.response.accountData.accounts;

  if (!hasAccounts()) {
    return <noscript />;
  }

  const currency = getCurrency(data);
  const {
    response: {
      accountData: { accounts }
    }
  } = data;

  return (
    <div>
      <h4 className="pink">Account data</h4>
      <div style={{ margin: "30px" }}>
        {accounts.map(account => {
          return (
            <p key={account.id}>
              <b>{account.name}</b>
              <br />
              {formatNumber(account.balance)} {currency}
            </p>
          );
        })}
      </div>
    </div>
  );
};

AccountsList.propTypes = {
  data: PropTypes.object.isRequired
};

export default AccountsList;
