import React from "react";
import PropTypes from "prop-types";

export const emojis = {
  money: "💰",
  chart: "📈",
  "wings-money": "💸",
  tada: "🎉",
  sad: "😞"
};

const Emoji = ({ type = "" }) => (
  <h3>
    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
      {emojis[type]}
    </span>
  </h3>
);

Emoji.propTypes = {
  type: PropTypes.string.isRequired
};

export default Emoji;
