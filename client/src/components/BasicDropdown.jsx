import React, { useState, useEffect } from "react";


export const BasicDropdown = ({ items, name, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(name);
  const toggle = () => setIsOpen(!isOpen);
  const select = ({ target: { innerText: value } }) => setValue(value);

  useEffect(() => {
    setIsOpen(false);
    onSelect(value);
  }, [value, onSelect]);

  const dropdownItems = items.map(item => (
    <option onClick={select} key={item}>
      {item}
    </option>
  ));

  return (
    <select isOpen={isOpen} toggle={toggle}>
      {dropdownItems}
    </select>
  );
};
