import React from "react";
import PropTypes from "prop-types";
import { getCurrency } from "../utils/getCurrency";
import { formatNumber, formatDate } from "../utils/Format";

export const Transactions = ({ data }) => {
  if (
    !data ||
    !data.response ||
    !data.response.transactionData ||
    !data.response.categoryData
  ) {
    return <noscript />;
  }
  const currency = getCurrency(data);

  if (data.response.transactionData.count === 0) {
    return (
      <div>
        <h4 className="pink">Some of your transactions</h4>
        <div style={{ margin: "30px" }}>
          <p>You don’t seem to have any transactions.</p>
        </div>
      </div>
    );
  }

  const transactions = data.response.transactionData.results.map(result => {
    const transaction = result.transaction;
    const category = data.response.categoryData.find(
      category => category.id === transaction.categoryId
    );
    return (
      <p key={transaction.id}>
        <b>{formatDate(new Date(transaction.date))}</b>
        <br />
        {transaction.description}
        <br />
        {formatNumber(transaction.amount)} {currency}
        <br />
        {category.primaryName}
      </p>
    );
  });

  return (
    <div>
      <h4 className="pink">Some of your transactions</h4>
      <div style={{ margin: "30px" }}>{transactions}</div>
    </div>
  );
};

Transactions.propTypes = {
  data: PropTypes.object.isRequired
};

export default Transactions;
