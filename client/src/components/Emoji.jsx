import React from "react";

export const emojis = {
  money: "💰",
  chart: "📈",
  "wings-money": "💸",
  tada: "🎉",
  sad: "😞"
};

export const Emoji = ({ type = "" }) => (
  <h3>
    <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">
      {emojis[type]}
    </span>
  </h3>
);
