import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import PropTypes from "prop-types";

export const BasicDropdown = ({ items, name, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(name);

  const toggle = () => setIsOpen(!isOpen);

  const select = ({ target: { innerText: value } }) => {
    setValue(value);
    toggle();
    onSelect(value);
  };

  const dropdownItems = items.map(item => (
    <DropdownItem onClick={select} key={item}>
      {item}
    </DropdownItem>
  ));

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{value}</DropdownToggle>
      <DropdownMenu>{dropdownItems}</DropdownMenu>
    </Dropdown>
  );
};

Dropdown.PropTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Dropdown;
