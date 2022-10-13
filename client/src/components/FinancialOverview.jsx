import React from "react";
import { Col, Row } from "reactstrap";
import { Spinner } from "./Spinner";
import { AccountsList } from "./AccountsList";
import { Investments } from "./Investments";
import { Transactions } from "./Transactions";

export const FinancialOverview = ({ data, error, loading }) => {
  if (error) {
    return <noscript />;
  }

  if (loading) {
    return <Spinner width="50px" image={"./spinner.png"} />;
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
