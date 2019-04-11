import React from "react";

export const Spinner = ({ image, width }) => (
  <img
    className="spinner"
    src={image}
    style={{ width: width }}
    alt={"Loading"}
  />
);

export default Spinner;
