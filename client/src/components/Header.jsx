import React from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";

export const Header = ({ emoji, text }) => (
  <div style={{ paddingBottom: "30px" }}>
    <h3>{text}</h3>
    <Emoji type={emoji} />
  </div>
);

Header.propTypes = {
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string
};

export default Header;
