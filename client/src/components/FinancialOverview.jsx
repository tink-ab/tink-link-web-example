import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import Spinner from "./Spinner";
import AccountsList from "./AccountsList";
import Investments from "./Investments";
import Transactions from "./Transactions";

export const FinancialOverview = ({ data, error, loading, status }) => {
  if (error) {
    return <code>ERROR: {error}</code>;
  }

  if (loading) {
    return (
      <>
        {status && (
          <div style={{ marginBottom: 16 }}>
            Processing financial data: {status}
          </div>
        )}
        <Spinner width="50px" image={"./spinner.png"} />
      </>
    );
  }

  if (!data) {
    return <noscript />;
  }

  return (
    <Row>
      <Col lg={{ size: 6, offset: 3 }}>
        <AccountsList data={data} />
        <Investments data={data} />
        <Transactions data={data} />
      </Col>
    </Row>
  );
};

FinancialOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.string
};

export default FinancialOverview;
