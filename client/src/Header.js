import React, {Component} from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";

export default class Header extends Component {

    render() {
        return (
            <div style={{paddingBottom: "30px"}}>
                <h3>
                    {this.props.text}
                </h3>
                <Emoji type={this.props.emoji}/>
            </div>
        );
    }
}

Header.propTypes = {
    text: PropTypes.string.isRequired,
    emoji: PropTypes.string
};
