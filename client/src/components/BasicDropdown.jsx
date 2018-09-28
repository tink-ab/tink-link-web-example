import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import PropTypes from 'prop-types';

export class BasicDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            value: this.props.name
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select(event) {
        const value = event.target.innerText;
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: value
        });
        this.props.onSelect(value);
    }

    render() {
        const dropdownItems = [];
        this.props.items.forEach((item) => {
            dropdownItems.push(<DropdownItem onClick={(event) => this.select(event)} key={item}>{item}</DropdownItem>)
        });

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.value}
                </DropdownToggle>
                <DropdownMenu>
                    {dropdownItems}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

Dropdown.PropTypes = {
    items: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
