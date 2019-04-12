import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../utils/Format";

export const Investments = ({ data }) => {
  if (
    !data ||
    !data.response ||
    !data.response.investmentData ||
    !data.response.investmentData.portfolios
  ) {
    return <noscript />;
  }
  const {
    response: {
      investmentData: { portfolios }
    }
  } = data;

  if (portfolios.length === 0) {
    return (
      <div>
        <h4 className="pink">Investment data</h4>
        <div style={{ margin: "30px" }}>
          <p>You don’t seem to have any investments.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="pink">Investment data</h4>
      <div style={{ margin: "30px" }}>
        {portfolios.map(portfolio => (
          <div key={portfolio.id}>
            <h5>Portfolio ({portfolio.type})</h5>
            {portfolio.instruments.map(instrument => (
              <p key={instrument.id}>
                <b>{instrument.name}</b>
                <br />
                Price: {formatNumber(instrument.price)} {instrument.currency}
                <br />
                Quantity: {instrument.quantity}
                <br />
                Profit: {formatNumber(instrument.profit)} {instrument.currency}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

Investments.propTypes = {
  data: PropTypes.object.isRequired
};

export default Investments;
