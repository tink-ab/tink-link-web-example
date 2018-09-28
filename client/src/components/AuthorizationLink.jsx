import React, {Component} from 'react';
import {Button} from "reactstrap";
import PropTypes from 'prop-types';

export default class AuthorizationLink extends Component {
    render() {
        const ssnData = this.props.ssn ? ("&input_username=" + this.props.ssn) : "";
        const link = "https://oauth.tink.se/0.4/authorize/?" +
            "client_id=6745522a5cb6472587174d0b22ad2905" +
            "&redirect_uri=https://demo.tink.se/callback" +
            "&scope=" + this.props.scope +
            ssnData +
            "&grant_type=authorization_code" +
            "&market=" + this.props.market +
            "&locale=" + this.props.locale;

        return (
            <Button href={link}>Connect Bank</Button>
        );
    }
}

AuthorizationLink.propTypes = {
    ssn: PropTypes.string,
    scope: PropTypes.string.isRequired,
    market: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired
};
