import React from "react";
import { Emoji } from "./Emoji";

export const Header = ({ emoji, text }) => (
  <div style={{ paddingBottom: "30px" }}>
    <h3>{text}</h3>
    <Emoji type={emoji} />
  </div>
);
